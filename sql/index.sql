USE project;
# 操作数据表的命令

-- CREATE TABLE `user` (
--     id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(100) NOT NULL COMMENT '名字',
--     age INT NOT NULL COMMENT '年龄',
--     address VARCHAR(255) COMMENT '地址',
--     create_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
-- ) COMMENT '用户表'

-- INSERT INTO
--     `user` (`name`, `age`, `address`)
-- VALUES ('测试', 18, '广州');

# 重命名
-- ALTER Table `user` RENAME `user2`

# 添加字段
-- ALTER Table `user2` ADD COLUMN `hobby` VARCHAR(200) COMMENT '爱好'

# 删除字段
-- ALTER Table `user2` DROP COLUMN `hobby`

# 修改字段
-- ALTER TABLE `user2` MODIFY `age` VARCHAR(100) COMMENT '年龄'

# 逗号连写

# 查询单个列
-- SELECT id FROM `user`

# 查询多个列
-- SELECT id, name FROM `user`

# 查询所有列
-- SELECT * FROM `user`

# 列的别名
-- SELECT id as `user_id` FROM `user`

# 排序
-- SELECT * FROM `user` ORDER BY id Desc;
-- SELECT * FROM `user` ORDER BY id ASC;

# 限制查询结果
# 0 = 开始行数
# 3 = 数量
-- SELECT * FROM `user` LIMIT 0, 3;

# 条件查询
-- SELECT * FROM `user` WHERE name = 'xiaodong';

# 联合查询
-- SELECT * FROM `user` WHERE name = 'xiaodong' AND age <= 20;
-- SELECT * FROM `user` WHERE name = 'xiaodong' OR age <= 20;

# 模糊查询
## 以 华 为结尾
-- SELECT * FROM `user` WHERE name LIKE '%华';

# 下划线模糊匹配一个字符
-- SELECT * FROM `user` WHERE name LIKE '_华%'

# 新增
-- INSERT INTO
--    user (`name`, `age`, `address`)
-- VALUES ('ceshi2', 18, '广西');

# 新增多个
-- INSERT INTO
--    `user` (`name`, `age`, `address`)
-- VALUES ('CESHI3', 18, '台州'),
--     ('ceshoi4', NULL, NULL)

# 编辑
-- UPDATE `user` SET name = '测试edit', age = 88, address = '顺德' WHERE id = 6;

# 删除
-- DELETE FROM `user` WHERE id = 6;