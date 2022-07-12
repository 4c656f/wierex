import cors from "cors";
import mysql from "mysql";
import express from "express";
import {gen_token} from "./token.js";
import JSZip from "jszip";
import fs from "fs";
import * as Console from "console";

const app = express()

app.use(cors())

app.use(express.json())


const db = mysql.createConnection({
    user: "root",
    host: "db",
    password: "5e4ZKbGTKUu7m6wNSBH9UZSZbPA8gRCeTS",
    database: "test"
});


app.post("/login", (req, res)=>{

    let token = req.body["user_token"]
    let telegram_id = req.body["telegram_id"]

    db.query(
        "SELECT * FROM users WHERE user_token = ? AND telegram_id = ?", [token, telegram_id],
        (err, result)=>{
            if (err){
                res.send([false, err]);

            }
            if (result){
                if(result.length === 1){

                    if(result[0]["node_token"]){
                        console.log("old", result[0]["node_token"])
                        res.send([true, result[0]["node_token"]])
                        db.close

                    }
                    else{
                        let node_token = gen_token(result[0]["user_token"])
                        console.log("new", node_token)
                        db.query("SELECT * FROM users WHERE node_token = ?", [node_token],  (err, results) => {
                            if (err) {
                                console.log("error: ", err);

                                res.send([false, err]);

                            }
                            if (results.length === 0){
                                console.log(token, telegram_id, node_token)
                                db.query("UPDATE users SET node_token = ? WHERE user_token = ? AND telegram_id = ?", [node_token, token, telegram_id], (err, res, fields) => {
                                    if (err) {
                                        console.log("error: ", err);
                                        res.send(err)
                                        return;
                                    }
                                })
                                res.send([true, node_token])


                            }
                        })

                    }









                }

                else{
                    res.send([false, "invalid id or token"])
                }
            }
            else{
                res.send([false, "strange error"])
            }
            db.close
        }

    )

})


app.post("/create_share", (req, res)=>{
    let node_token = req.body["node_token"]
    let uuid = req.body["uuid"]
    let shared_token = gen_token(node_token)


    db.query(
        "SELECT * FROM users WHERE node_token = ?", [node_token],
        (err, result)=>{
            if (err){
                console.log(err)
                res.send(err)
            }
            if (result){
                if(result.length > 0){



                    db.query("SELECT * FROM shared WHERE uuid = ?", [uuid],
                        (err, result)=>{



                            if (err){
                                console.log(err)
                                res.send(err)
                            }
                            if (result.length > 0){



                                res.send(result[0]["share_token"])
                                return;

                            }
                            else {

                                db.query("INSERT INTO shared (share_token, uuid, node_token) VALUES (?, ?, ?)", [shared_token, uuid, node_token], (err) => {
                                    if (err) {
                                        console.log("error: ", err);
                                        res.send(err)
                                        return;
                                    }
                                    res.send(shared_token)

                                })


                            }



                        })











                }

                else{
                    res.send(false)
                }
            }
            else{
                res.send("Непредвиденная ошибка")
            }
            db.close
        }

    )






})




app.post("/get_shared", (req, res)=>{
    let shared_token = req.body["link_token"]



    db.query(
        "SELECT * FROM shared WHERE share_token = ?", [shared_token],
        (err, result)=>{
            if (err){
                console.log(err)
                res.send(err)
            }
            if (result){
                if(result.length === 1){



                    let uuid = result[0]["uuid"]
                    let node_tk = result[0]["node_token"]
                    console.log(uuid)
                    console.log(node_tk)



                    db.query("SELECT * FROM users WHERE node_token = ?", [node_tk],  (err, result_selection) => {
                        if (err) {
                            console.log("error: ", err);

                            res.send(err);

                        }
                        if (result_selection.length > 0){


                            let response = {}


                            let data = JSON.parse(result_selection[0]["render_status"])[uuid]


                            response[uuid] = data


                            console.log(response)


                            res.send(response)


                        }
                    })











                }

                else{
                    res.send(false)
                }
            }
            else{
                res.send("Непредвиденная ошибка")
            }
            db.close
        }

    )






})






app.post("/check_node_token", (req, res)=>{

    let node_token = req.body["node_token"]


    db.query(
        "SELECT * FROM users WHERE node_token = ?", [node_token],
        (err, result)=>{
            if (err){
                console.log(err)
                res.send(err)
            }
            if (result){
                if(result.length > 0){
                    res.send(true)
                }

                else{
                    res.send(false)
                }
            }
            else{
                res.send("Непредвиденная ошибка")
            }
            db.close
        }

    )

})



async function readZipArchive(res, version) {





       if(version ==20){

           fs.readFile("./files/wierex_20.zip", async (err, data) => {

               if (err) throw err;

               let zip = await JSZip.loadAsync(data)

               let zip_encoded = await zip.generateAsync({ type: "base64" })



               res.send(zip_encoded)


           })

       }else if(version ==23){

        fs.readFile("./files/wierex_23.zip", async (err, data) => {

            if (err) throw err;

            let zip = await JSZip.loadAsync(data)

            let zip_encoded = await zip.generateAsync({ type: "base64" })



            res.send(zip_encoded)


        })

    }










}


app.get("/download", (req,res)=>{






    let version = req.query["version"]

    console.log(version)

    readZipArchive(res, version);









})





app.post("/render_info", (req, res)=>{

    let node_token = req.body["node_token"]


    db.query(
        "SELECT * FROM users WHERE node_token = ?", [node_token],
        (err, result)=>{
            if (err){
                console.log(err)
                res.send(err)
            }
            if (result){
                if(result.length === 1){
                    res.send(result[0]["render_status"])
                }

                else{
                    res.send(false)
                }
            }
            else{
                res.send("Непредвиденная ошибка")
            }
            db.close
        }

    )

})


app.listen(3001, ()=>{
    console.log("srever_up")
});