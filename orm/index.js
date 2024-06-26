// import mysql2 from "mysql2/promise";
import fs from "node:fs";
import jsyaml from "js-yaml";
import express from "express";
import knex from "knex";

const yaml = fs.readFileSync("./db.config.yaml", "utf8");

const config = jsyaml.load(yaml);

// const sql = await mysql2.createConnection({
//   ...config.db,
// });

const db = knex({
  client: "mysql2",
  connection: config.db,
});

// knex 所有代码直接编写是没有效果的
db.schema
  .createTableIfNotExists("list", (table) => {
    table.increments("id"); // id 主键 自增
    table.string("name").notNullable();
    table.integer("age").notNullable();
    table.string("address").notNullable();
    table.integer("money").notNullable();
    table.timestamps(true, true); // 创建时间 更新时间
  })
  .then(() => {
    console.log("创建成功");
  });

// 保持原子的一致性，要么都成功，要么就都回滚
db.transaction(async (trx) => {
  try {
    await trx("list").update({ money: -100 }).where({ id: 1 });
    await trx("list").update({ money: +100 }).where({ id: 2 });
    await trx.commit(); // 提交事务
  } catch (err) {
    await trx.rollback();
  }
})
  .then(() => {
    console.log("成功");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  // const [data] = await sql.query("select * from user");
  const data = await db("list").select();
  const count = await db("list").count(`* as total`);
  const table = await db("user")
    .select()
    .leftJoin("table", "user.id", "table.user_id");

  db.raw("select * from user").then((data) => {
    console.log(data);
  });
  res.json({
    data,
    table,
    total: count[0].total,
  });
});

app.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  // const [data] = await sql.query("select * from user where id =?", [id]);
  const data = await db("list").select().where({ id });
  res.send(data);
});

app.post("/create", async (req, res) => {
  const { name, age, address } = req.body;
  // const [data] = await sql.query(
  //   "insert into user(name,age,address) values(?,?,?)",
  //   [name, age, address]
  // );
  await db("list").insert({ name, age, address });
  res.send({ code: 1, msg: "success" });
});

app.post("/update", async (req, res) => {
  const { name, age, address, id } = req.body;
  // await sql.query("update user set name = ?,age = ?,address = ?,where id = ?", [
  //   name,
  //   age,
  //   address,
  //   id,
  // ]);
  await db("list").update({ name, age, address }).where({ id });
  res.send({ code: 1, msg: "success" });
});

app.post("/delete", async (req, res) => {
  // await sql.query(`delete from user where id = ? `, [req.body.id]);
  await db("list").delete().where({ id: req.body.id });
  res.send({ code: 1, msg: "success" });
});

const port = 3000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
