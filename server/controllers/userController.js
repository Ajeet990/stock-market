const mysql = require("mysql");

//connectio pool
// const pool = mysql.createPool({connectionLimit: 100, host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASS, database: process.env.DB_NAME});

//view users
exports.view = (req, res) => {
  res.render('home')
  //Route
  //connect to db
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    console.log("Connected as ID:" + connection.threadId);

    //user the connection
    connection.query("SELECT * FROM subject", (err, rows) => {
      connection.release();

      if (!err) {
        let bank_delete = req.query.removed;
        let insert = req.query.insert;
        let update = req.query.updated;
        let add = req.query.add;
        let sell = req.query.sold;
        let out = req.query.out;
        let p_bank = req.query.p_bank;
        let equal = req.query.equal;
        let less = req.query.less;
        let more = req.query.more;
        res.render("home", {
          bank_delete,
          insert,
          update,
          add,
          sell,
          out,
          p_bank,
          equal,
          less,
          more
        });
      } else {
        console.log("sorry try again");
      }

      console.log("data from the database : \n", rows);
    });
  });
};

//Profile page
exports.profile = (req, res) => {
  res.render("profile");
};

//Showing market list
exports.market = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    console.log("connected as id :" + connection.threadId);

    connection.query("select * from banks", (err, rows) => {
      connection.release();

      if (!err) {
        res.render("market-list", {rows});
      } else {
        console.log("sorry");
      }
    });
  });
};

//Profile page
exports.dashboard = (req, res) => {
  let T_investment = 0;
  let T_stock = 0;
  let T_sold = 0;
  let T_amt = 0;
  
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    connection.query("SELECT * FROM profile", (err, rows) => {
      
      if (!err) {
        //query to get total number of stock
        connection.query('SELECT * FROM bought ',(err, row) =>{
          
          for ( var i = 0; i<row.length; i++){
            T_stock += row[i].stock_amt;
            
          }
          connection.query('SELECT * FROM transactions where status = ?',['Bought'], (err, ro) =>{
            for ( var i = 0; i<ro.length; i++){
              T_investment += ro[i].amount;
              
            }
            connection.query('SELECT * FROM transactions where status = ?',['Sold'], (err, r) =>{
              for ( var i = 0; i<r.length; i++){
                T_sold += r[i].amount;
                
              }
              // 
              connection.query('SELECT * FROM bought',(err, rr) =>{
                for (var i = 0; i<rr.length; i++){
                  T_amt += rr[i].amount;
                }

                res.render('dashboard',{rows, T_stock, T_investment, T_sold, T_amt});
              })
              
              
          })


            
        })


        })


          //query to total amount of investment
          
      //   //query to get total amount of sold money
        



          // 
          

      }
    
    });
  });
};

//Insert into bought details
exports.insert = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    
    let num_share = parseInt(req.body.num_share);
    let id = req.body.b_id;
    // console.log(num_share);
    // console.log(id);

    connection.query("select * from banks where id = ?", [id], (err, rows) => {
      connection.release();
      let avail_stock = parseInt(rows[0].available_stock);
      let b_name = rows[0].name;
      let per = parseInt(rows[0].per_s_price);

      if (num_share > avail_stock) {
        let outstock = encodeURIComponent("out of stock");
        res.redirect("/?out=" + outstock);
      } else {
        pool.getConnection((err, join) => {
          if (err) 
            throw err;
          join.query("SELECT * FROM bought where name = ?", [b_name], (err, lines) => {
            join.release();
            if (!err) {
              if (lines.length > 0) {
                // console.log(lines.length);
                let st_amt = parseInt(lines[0].stock_amt);
                
                pool.getConnection((err, co) => {
                  if (err) 
                    throw err;
                  co.query("UPDATE banks set available_stock = ? where id = ?", [
                    avail_stock - num_share,
                    id
                  ], (err, s) => {
                    co.release();
                    if (!err) {
                      pool.getConnection((err, joinn) => {
                        if (err) 
                          throw err;
                        joinn.query("UPDATE bought SET stock_amt = ? where name = ?", [
                          num_share + st_amt,
                          b_name
                        ], (err, liness) => {
                          if (!err) {
                            pool.getConnection((err, cnn) => {
                              if (err) 
                                throw err;
                              cnn.query("select * from profile where id = ?", [1], (err, rr) => {
                                cnn.release();
                                let present_amt = rr[0].amount;
                                if (!err) {
                                  
                                  pool.getConnection((err, cn) => {
                                    if (err) 
                                      throw err;
                                    cn.query("UPDATE profile set amount = ? where id = ?", [
                                      present_amt - per * num_share,
                                      1
                                    ], (err, r) => {
                                      
                                      if (!err) {
                                        
                                        
                                        cn.query('INSERT into transactions set bname = ?, num_stock = ?, per_unit = ?, amount = ?, status = ?',[b_name, num_share, per, (num_share*per), "Bought"],(err, u) =>{
                                          let news = encodeURIComponent("Bought the privious bank stock");
                                        res.redirect("/?p_bank=" + news);

                                        })
                                      }
                                    });
                                  });
                                }
                              });
                            });
                          }
                        });
                      });
                    }
                  });
                });
              } else {
                if (!err) {
                  pool.getConnection((err, connection) => {
                    if (err) 
                      throw err;
                    
                    //Insert bought bank details into Bought table
                    connection.query("INSERT into bought set name = ?, per_s_cost = ?, stock_amt = ?, amount = ?", [rows[0].name,
                      rows[0].per_s_price,
                      num_share,
                      rows[0].per_s_price * num_share //To use at the decrement of the total money
                    ], (err, row) => {
                      connection.release();
                      if (!err) {
                        // console.log(rows[0].available_stock);
                        pool.getConnection((err, connection) => {
                          if (err) 
                            throw err;
                          
                          //To update the total number of available stock
                          connection.query("UPDATE banks set available_stock = ? where id = ?", [
                            rows[0].available_stock - num_share,
                            id
                          ], (err, ro) => {
                            connection.release();
                            if (!err) {
                              // res.redirect("/");
                              pool.getConnection((err, conne) => {
                                if (err) 
                                  throw err;
                                conne.query("SELECT * FROM profile", (err, r) => {
                                  conne.release();
                                  let b_amt = r[0].amount;
                                  if (!err) {
                                    pool.getConnection((err, co) => {
                                      if (err) 
                                        throw err;
                                      co.query("UPDATE profile set amount = ? where id = ?", [
                                        b_amt - rows[0].per_s_price * num_share,
                                        1
                                      ], (err, success) => {
                                        co.release();
                                        if (!err) {
                                          pool.getConnection((err, ins) => {
                                            if (err) 
                                              throw err;
                                            ins.query("INSERT into transactions set bname = ?, num_stock = ?, per_unit = ?, amount = ?, status = ?", [
                                              rows[0].name,
                                              num_share,
                                              rows[0].per_s_price,
                                              rows[0].per_s_price * num_share,
                                              "Bought"
                                            ], (err, ready) => {
                                              ins.release();
                                              if (!err) {
                                                let inserted = encodeURIComponent("Data inserted sucessfully");
                                                res.redirect("/?insert=" + inserted);
                                              }
                                            });
                                          });
                                        }
                                      });
                                    });
                                  }
                                });
                              });
                            }
                          });
                        });
                      }
                    });
                  });
                }
              }
            }
          });
        });

        // else {
        //   console.log("sorry");
        // }
      }
    });
  });
};

// To show the Bought Details in Dashboard Modal
exports.my_stock = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    
    connection.query("SELECT * FROM bought", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("my_stock", {rows});
      }
    });
  });
};


//Selling desired number of stocks
//Rendering to the sell page
exports.sell = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    connection.query("SELECT * FROM bought where id = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        // console.log('running')
        res.render("sell", {rows});
      }
    });
  });
};

//Finally selling the desired number of stocks
exports.final_sell = (req, res) => {
  // console.log(req.body.s_sell);
  let quantity = parseInt(req.body.s_sell);
  let id = req.params.id;
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    connection.query("SELECT * FROM bought WHERE id = ?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        let avail_stk = parseInt(rows[0].stock_amt);
        let bname = rows[0].name;
        let T_amt = parseInt(rows[0].amount);
        let cost_per_s = parseInt(rows[0].per_s_cost);
        pool.getConnection((err, connect) => {
          if (err) 
            throw err;
          connect.query("SELECT * from profile where id = ?", [1], (err, lines) => {
            connect.release();
            let available_money = lines[0].amount;
            if (!err) {
              //checking if the available quantity and selling quantity are equal
              if (quantity == avail_stk) {
                pool.getConnection((err, connec) => {
                  if (err) 
                    throw err;
                  connec.query("UPDATE profile set amount = ? where id = ?", [
                    available_money + T_amt,
                    1
                  ], (err, roooooo) => {
                    connec.release();
                    if (!err) {
                      pool.getConnection((err, conne) => {
                        if (err) 
                          throw err;
                        conne.query("DELETE from bought where id = ?", [id], (err, line) => {
                          conne.release();
                          if (!err) {
                            
                            pool.getConnection((err, co) =>{
                              if (err) throw err;
                              co.query('INSERT into transactions set bname = ?, num_stock = ?, per_unit = ?, amount = ?, status = ?',[bname, quantity, cost_per_s, T_amt, "Sold"], (err, t) =>{
                                co.release();
                                if(!err){
                                  let msg = encodeURIComponent("equal number of selling and available");
                            res.redirect("/?equal= " + msg);

                                }
                              })
                            })
                          }
                        });
                      });
                    }
                  });
                });
              } else if (quantity < avail_stk) {
                let rem_stk = parseInt(avail_stk - quantity);
                pool.getConnection((err, connec) => {
                  if (err) 
                    throw err;
                  connec.query("UPDATE profile set amount = ? where id = ?", [
                    available_money + quantity * cost_per_s,
                    1
                  ], (err, roooooo) => {
                    connec.release();
                    if (!err) {
                      pool.getConnection((err, conne) => {
                        if (err) 
                          throw err;
                        conne.query("UPDATE bought set stock_amt = ?,amount = ? where id = ?", [
                          rem_stk, rem_stk * cost_per_s,
                          id
                        ], (err, line) => {
                          conne.release();
                          if (!err) {

                            pool.getConnection((err, co) =>{
                              if (err) throw err;
                              co.query('INSERT into transactions set bname = ?, num_stock = ?, per_unit = ?, amount = ?, status = ?',[bname, quantity, cost_per_s, (quantity * cost_per_s), "Sold"], (err, t) =>{
                                co.release();
                                if(!err){
                                  let msg = encodeURIComponent("Less number of selling stock");
                            res.redirect("/?less= " + msg);

                                }
                              })
                            })


                            
                          }
                        });
                      });
                    }
                  });
                });
              } else {
                let msg = encodeURIComponent("trying to sell more than available number");
                res.redirect("/?more= " + msg);
              }
            }
          });
        });
      }
    });
  });
};

//search functionalily
exports.search = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    let item = req.body.find;
    // console.log(item);
    connection.query("SELECT * FROM banks WHERE name LIKE ?", ["%" + item + "%"], (err, rows) => {
      connection.release();
      if (!err) {
        // console.log(rows);
        let len = rows.length;

        res.render("search-result", {rows, item, len});
      }
    });
  });
};

//Insert new Bank
exports.addBank = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    const {bname, stock, scost} = req.body;
    connection.query("INSERT into banks SET name = ?, available_stock = ?, per_s_price = ?", [
      bname, stock, scost
    ], (err, rows) => {
      connection.release();
      if (!err) {
        let add = encodeURIComponent("added");
        res.redirect("/?add=" + add);
      }
    });
  });
};

//Edit bank details
exports.EditBank = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    
    // console.log(req.params.id);

    connection.query("SELECT * FROM banks where id = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("edit_bank", {rows});
      }
    });
  });
};

//Update bank details
exports.updateBank = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    console.log(req.params.id);
    console.log(req.body.bname);
    console.log(req.body.available);
    console.log(req.body.price);

    connection.query("UPDATE banks set name = ?,available_stock = ?, per_s_price = ? where id = ?", [
      req.body.bname, req.body.available, req.body.price, req.params.id
    ], (err, rows) => {
      connection.release();
      if (!err) {
        let up = encodeURIComponent("updated");
        res.redirect("/?updated=" + up);
      }
    });
  });
};

//Delete bank
exports.deleteBank = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    
    // console.log(req.params.id);

    connection.query("DELETE FROM banks where id = ?", [req.params.id], (err, rows) => {
      connection.release();
      if (!err) {
        let bdelete = encodeURIComponent("The bank sucessfully deleted");

        res.redirect("/?removed=" + bdelete);
        // res.redirect('/');
      }
    });
  });
};

//View all transaction
exports.transaction = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) 
      throw err;
    connection.query("SELECT * FROM transactions", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("transactions", {rows});
      }
    });
  });
};



//Showing Details
exports.detail = (req, res) =>{
  let id = req.params.id;
  let T_invest = 0;
  let T_sold = 0;
  let curr_amt = 0;
  pool.getConnection((err, connection) =>{
    if(err) throw err;
    connection.query('SELECT * from bought where id = ?',[id],(err, rows)=>{
      if(!err){
        let bname = rows[0].name;
        curr_amt = rows[0].amount;
        //get sold amount from transaction
        connection.query('SELECT * FROM transactions where bname = ? and status = ?',[bname, "Sold"], (err, row) =>{
          for (var i = 0; i<row.length; i++){
            T_sold += row[i].amount;

          }
          //get bought amount from transaction
          connection.query('SELECT * FROM transactions where bname = ? and status = ?',[bname, "Bought"], (err, ro) =>{
            for (var i = 0; i<ro.length; i++){
              T_invest += ro[i].amount;
  
            }
            res.render('detail',{T_invest, T_sold, curr_amt, bname});



          })
          
        })
      }
    })
  })
}

//redirecting to my_stock page
exports.done = (req, res) =>{
  res.redirect('my_stock')
}
