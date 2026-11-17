const express = require("express");
const app = require(express);
const DB = require("mysql2/promise");
app.use = Cors()

/*1. SELECT megnevezes FROM `szolgaltatasok` WHERE aktiv = 1 ORDER BY alapar ASC;
2. SELECT * FROM `szolgaltatasok` WHERE aktiv = 1 and munkaido_perc <= 60; 
3. SELECT megnevezes FROM `szolgaltatasok` WHERE megnevezes LIKE "°%valami%"; 
4. SELECT kategoriak.nev, COUNT(szolgaltatasok) AS "szolgaltatasok szama", AVG(alapar) FROM `szolgaltatasok` INNER JOIN kategoriak ON szolgaltatasok.kategoria_id = kategoriak.id;
5. SELECT alapar, megnevezes, munkaido_perc FROM `szolgaltatasok` WHERE alapar > 25000 order by munkaido_perc DESC; */

const pool = DB.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'szerviz_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  
const query1 = "SELECT megnevezes FROM `szolgaltatasok` WHERE aktiv = 1 ORDER BY alapar ASC;"
app.get("/szerviz/csokkeno ar", async (req, res) =>
    {
        try{res.send(mysql.query(query1))} 
        catch (error)
        {
           console.error('Hiba az adatok megszerzésében', error.message);
           res.status(500).json({
           success: false,
           message: 'Internal server error',
           error : error.message                
           })
        }
    });
   const query3 ="UPDATE `kategoriak` SET nev = 'hibakeresés' WHERE id = 2;"
    app.post("szerviz/hozzaad", async (req, res) => 
        {
            res.send(DB.query(DB.query(query3), (err, result) => {
                if (err) throw err;
            }));
            res.send('A könyvek sikeresen hozzáadva!');
        });
        const query4= "DELETE FROM `szolgaltatasok` WHERE id = 5;"
        app.get("szerviz/torol", async (req, res) => 
            
            {
                res.send(DB.query(query4));
            });
            
       
const port = 3306;
app.listen("szerver fut a http//:${port} porton")