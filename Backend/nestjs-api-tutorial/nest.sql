/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80042
 Source Host           : localhost:3306
 Source Schema         : nest

 Target Server Type    : MySQL
 Target Server Version : 80042
 File Encoding         : 65001

 Date: 03/02/2026 17:06:23
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for hospitals
-- ----------------------------
DROP TABLE IF EXISTS `hospitals`;
CREATE TABLE `hospitals`  (
  `rank` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `label` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `avatar_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `intro` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of hospitals
-- ----------------------------
INSERT INTO `hospitals` VALUES ('三甲', '综合病院', 'https://upz.itndedu.com/uploads/20231105/d64c396c15bd003d45f79e939180301c.jpeg', 1, '武汉中心医院', '武汉市中心医院是一家位于中国湖北省武汉市的大型综合性医院。', 1);
INSERT INTO `hospitals` VALUES ('三甲', '综合病院', 'https://upz.itndedu.com/uploads/20231105/308e36361cf273fdefe35c80c3134f92.jpeg', 5, '协和医院', '协和医院是中国的一家著名综合性医院，拥有一流的医疗设施和技术。', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'yjr', 'meme@qq.com');
INSERT INTO `user` VALUES (2, 'yjr11', 'test0@qq.com');
INSERT INTO `user` VALUES (3, 'test', 'test@qq.com');
INSERT INTO `user` VALUES (4, 'test2', 'test2@qq.com');

-- ----------------------------
-- Table structure for useryjr
-- ----------------------------
DROP TABLE IF EXISTS `useryjr`;
CREATE TABLE `useryjr`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of useryjr
-- ----------------------------
INSERT INTO `useryjr` VALUES (1, 'yjr', '$2b$10$Oc4uSARVIKKj2g3J2kI9be6pgyMoD0oXPN10WH3h8YW0qPvMiNdda', 'user');
INSERT INTO `useryjr` VALUES (2, '13392502641', '$2b$10$PI.CyaFDQT9dTOhwBKg/8OR7FtgxU6PTdYiYcL6/fC7pZhfdGY8BW', 'admin');

SET FOREIGN_KEY_CHECKS = 1;
