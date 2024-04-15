
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for accom
-- ----------------------------
DROP TABLE IF EXISTS `accom`;
CREATE TABLE `accom`  (
  `accom_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accom_room` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accom_pass` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accom_intime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accom_outime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accom_order` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `accom_price` int(5) NOT NULL,
  `accom_staff` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `accom_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `accom_state` int(2) NOT NULL DEFAULT 0,
  PRIMARY KEY (`accom_code`) USING BTREE,
  INDEX `accom_room`(`accom_room`) USING BTREE,
  INDEX `accom_order`(`accom_order`) USING BTREE,
  INDEX `accom_ibfk_4`(`accom_staff`) USING BTREE,
  INDEX `accom_ibfk_2`(`accom_pass`) USING BTREE,
  CONSTRAINT `accom_ibfk_1` FOREIGN KEY (`accom_room`) REFERENCES `room` (`room_code`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `accom_ibfk_2` FOREIGN KEY (`accom_pass`) REFERENCES `passenger` (`pass_code`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `accom_ibfk_4` FOREIGN KEY (`accom_staff`) REFERENCES `staff` (`staff_login`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of accom
-- ----------------------------
INSERT INTO `accom` VALUES ('A20230612221835', 'r005', 'p20170504160615', '2023-06-12', '2023-06-15', NULL, 1100, 'user', '', 0);
INSERT INTO `accom` VALUES ('A2023061222731', 'r0012', 'p20230612214213', '2023-06-12', '2023-06-18', NULL, 1300, 'user', '', 0);
INSERT INTO `accom` VALUES ('A2023061222849', 'r007', 'p20230612220837', '2023-06-12', '2023-06-30', 'O20230612220917', 9305, 'user', '给他安排总统套房', 0);

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `goods_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goods_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `goods_count` int(5) NOT NULL,
  `goods_price` int(5) NOT NULL,
  PRIMARY KEY (`goods_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('g001', 'Toothbrush', 16, 8);
INSERT INTO `goods` VALUES ('g002', 'Tissue', 8, 3);
INSERT INTO `goods` VALUES ('g003', 'Toothpaste', 5, 10);
INSERT INTO `goods` VALUES ('g004', 'Slippers', 0, 19);
INSERT INTO `goods` VALUES ('g005', 'Comb', 3, 8);
INSERT INTO `goods` VALUES ('g006', 'Towel', 0, 13);
INSERT INTO `goods` VALUES ('g007', 'Nail Clippers Set', 4, 12);
INSERT INTO `goods` VALUES ('g008', 'Cup', 7, 5);
-- ----------------------------
-- Table structure for gorder
-- ----------------------------
DROP TABLE IF EXISTS `gorder`;
CREATE TABLE `gorder`  (
  `order_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `order_goods` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `order_count` int(5) NOT NULL,
  `order_price` int(5) NOT NULL,
  `order_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `order_type` int(2) NOT NULL,
  `order_shop` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`order_code`) USING BTREE,
  INDEX `order_goods`(`order_goods`) USING BTREE,
  INDEX `gorder_shop`(`order_shop`) USING BTREE,
  CONSTRAINT `gorder_ibfk_1` FOREIGN KEY (`order_goods`) REFERENCES `goods` (`goods_code`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `gorder_shop` FOREIGN KEY (`order_shop`) REFERENCES `shop` (`shop_code`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of gorder
-- ----------------------------
INSERT INTO `gorder` VALUES ('O20170528143732', 'g002', 10, 30, '2023-05-28 14:37:32', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528143737', 'g008', 5, 25, '2017-05-28 14:37:37', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528143743', 'g001', 12, 96, '2017-05-28 14:37:43', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528143750', 'g003', 5, 50, '2017-05-28 14:37:50', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528143757', 'g007', 3, 36, '2017-05-28 14:37:57', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528143801', 'g005', 1, 8, '2017-05-28 14:38:01', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528143911', 'g001', 2, 16, '2017-05-28 14:39:11', 0, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170528144226', 'g008', 4, 20, '2017-05-28 14:42:26', 1, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145005', 'g007', 3, 36, '2017-05-28 14:50:05', 1, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145009', 'g005', 5, 40, '2017-05-28 14:50:09', 1, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145014', 'g001', 7, 56, '2017-05-28 14:50:14', 1, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145108', 'g001', 1, 8, '2017-05-28 14:51:08', 0, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145111', 'g007', 1, 12, '2017-05-28 14:51:11', 0, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145211', 'g008', 1, 5, '2017-05-28 14:52:11', 0, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170528145928', 'g007', 1, 12, '2017-05-28 14:59:28', 0, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20170531092419', 'g008', 1, 5, '2017-05-31 09:24:19', 0, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170602084128', 'g002', 1, 3, '2017-06-02 08:41:28', 0, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20170602084258', 'g008', 1, 5, '2017-06-02 08:42:58', 1, 'S20170523125608');
INSERT INTO `gorder` VALUES ('O20230612214850', 'g002', 1, 3, '2023-06-12 21:48:50', 0, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20230612215130', 'g005', 3, 24, '2023-06-12 21:51:30', 0, 'S20170523132717');
INSERT INTO `gorder` VALUES ('O20230612220917', 'g008', 1, 5, '2023-06-12 22:09:17', 0, 'S20170523132717');

-- ----------------------------
-- Table structure for passenger
-- ----------------------------
DROP TABLE IF EXISTS `passenger`;
CREATE TABLE `passenger`  (
   `pass_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `pass_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `pass_age` int(255) NULL DEFAULT NULL,
   `pass_sex` varchar(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
   `pass_idcard` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `pass_tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
   `pass_state` int(2) NOT NULL DEFAULT 0,
   `pass_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
   PRIMARY KEY (`pass_code`) USING BTREE
 ) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

 -- ----------------------------
 -- Records of passenger
 -- ----------------------------
 INSERT INTO `passenger` VALUES ('p20170504155807', 'Qingming', 21, 'male', '141101199706181234', '13305056709', 1, '');
 INSERT INTO `passenger` VALUES ('p20170504160006', 'Cimu Tongzi', 27, 'male', '210101199111137101', '18245048947', 1, '');
 INSERT INTO `passenger` VALUES ('p20170504160303', 'Liu Fan', 30, 'male', '41101198809192345', '15700302340', 1, '');
 INSERT INTO `passenger` VALUES ('p20170504160411', 'Zhang Wen', 29, 'female', '140101198904174789', '18840506792', 1, '');
 INSERT INTO `passenger` VALUES ('p20170504160516', 'Zuoyou', 25, 'female', '13111199307102391', '13068949673', 1, '');
 INSERT INTO `passenger` VALUES ('p20170504160615', 'Shen Yu', 26, 'male', '21201199210102111', '15634890153', 1, '111');
 INSERT INTO `passenger` VALUES ('p20170504163947', 'Zhang Jia', 31, 'male', '121101198709103795', '18834803863', 1, '');
 INSERT INTO `passenger` VALUES ('p20170513153949', 'Xiatiao', 27, 'male', '122101199112278951', '13087493759', 1, '');
 INSERT INTO `passenger` VALUES ('p20230612214213', 'test', 23, 'male', '23423424566245', '132234234545', 1, 'test');
 INSERT INTO `passenger` VALUES ('p20230612220837', 'Liang Dada', 21, 'male', '45098123723823452345', '13132345634', 1, 'handsome');
-- -- ----------------------------
-- -- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `room_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `room_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `room_cash` int(3) NOT NULL,
  `room_price` int(5) NOT NULL,
  `room_state` int(2) NOT NULL DEFAULT 0,
  `room_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `room_shop` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`room_code`) USING BTREE,
  INDEX `rshop`(`room_shop`) USING BTREE,
  CONSTRAINT `rshop` FOREIGN KEY (`room_shop`) REFERENCES `shop` (`shop_code`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('r001', 'Standard Room', 100, 100, 1, NULL, 'S20170523125608');
INSERT INTO `room` VALUES ('r0012', 'Standard Room', 100, 200, 1, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r002', 'Deluxe Room', 200, 300, 1, NULL, 'S20170523125608');
INSERT INTO `room` VALUES ('r003', 'Standard Room', 100, 200, 1, NULL, 'S20170523125608');
INSERT INTO `room` VALUES ('r004', 'Standard Room', 100, 100, 1, NULL, 'S20170523125608');
INSERT INTO `room` VALUES ('r005', 'Deluxe Room', 200, 300, 1, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r006', 'Standard Room', 100, 200, 0, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r007', 'Presidential Suite', 300, 500, 1, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r008', 'Presidential Suite', 300, 500, 1, NULL, 'S20170523125608');
INSERT INTO `room` VALUES ('r009', 'Standard Room', 100, 100, 0, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r010', 'Standard Room', 100, 100, 0, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r011', 'Standard Room', 100, 100, 0, NULL, 'S20170523132717');
INSERT INTO `room` VALUES ('r012', 'Standard Room', 100, 100, 0, NULL, 'S20170523132717');
-- ----------------------------
-- Table structure for shop
-- ----------------------------
DROP TABLE IF EXISTS `shop`;
CREATE TABLE `shop`  (
  `shop_code` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `shop_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `shop_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `shop_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `shop_state` int(2) NOT NULL DEFAULT 0,
  `shop_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`shop_code`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of shop
-- ----------------------------
INSERT INTO `shop` VALUES ('S20170523125608', 'International Hotel', 'No. 2 Longcheng Road, Downtown District', '2023/06/10 12:56:08', 1, '');
INSERT INTO `shop` VALUES ('S20170523132717', 'Vienna International Hotel', 'Block B, Fengqingang, No. 9 Zhongshan Middle Road, Downtown District', '2023/06/10 13:27:17', 1, '');
-- ----------------------------
-- Table structure for staff
-- ----------------------------
DROP TABLE IF EXISTS `staff`;
CREATE TABLE `staff`  (
  `staff_login` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `staff_name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `staff_pwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `staff_type` int(255) NOT NULL,
  `staff_age` int(255) NULL DEFAULT NULL,
  `staff_sex` char(6) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `staff_time` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `staff_tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `staff_address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `staff_state` int(2) NOT NULL DEFAULT 0,
  `staff_remark` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `staff_shop` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`staff_login`) USING BTREE,
  INDEX `shop`(`staff_shop`) USING BTREE,
  CONSTRAINT `shop` FOREIGN KEY (`staff_shop`) REFERENCES `shop` (`shop_code`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of staff
-- ----------------------------
INSERT INTO `staff` VALUES ('admin', 'Administrator', '123', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, 'S20170523125608');
INSERT INTO `staff` VALUES ('hyh', 'he', '123', 1, 32, 'Male', '2017-03-25', '', '', 0, '', 'S20170523125608');
INSERT INTO `staff` VALUES ('lgf', 'liang', '123', 2, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `staff` VALUES ('sysadmin', 'Super Administrator', '123', 2, 28, 'Male', '2017-04-24', '13345066603', '', 0, '', NULL);
INSERT INTO `staff` VALUES ('test', 'test', '123', 1, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL);
INSERT INTO `staff` VALUES ('user', 'Employee', '123', 0, 22, 'Male', '0002-11-30', '1234234', 'Guangxi', 1, 'Test account', 'S20170523132717');
INSERT INTO `staff` VALUES ('ygl', 'yang', '123', 0, 22, 'Male', '2023-06-12', '1234234', '', 0, '', 'S20170523132717');
-- ----------------------------
-- Triggers structure for table accom
-- ----------------------------
DROP TRIGGER IF EXISTS `roompassstaff_update`;
delimiter ;;
CREATE TRIGGER `roompassstaff_update` AFTER INSERT ON `accom` FOR EACH ROW begin
update room set room_state=1 where room_code=new.accom_room;
update passenger set pass_state=1 where pass_code=new.accom_pass;
update staff set staff_state=1 where staff_login=new.accom_staff;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table accom
-- ----------------------------
DROP TRIGGER IF EXISTS `roomState_update`;
delimiter ;;
CREATE TRIGGER `roomState_update` AFTER UPDATE ON `accom` FOR EACH ROW begin
if(new.accom_state=1) then
update room set room_state=0 where room_code=new.accom_room;
end if;
end
;;
delimiter ;

-- ----------------------------
-- Triggers structure for table gorder
-- ----------------------------
DROP TRIGGER IF EXISTS `goods_order`;
delimiter ;;
CREATE TRIGGER `goods_order` AFTER INSERT ON `gorder` FOR EACH ROW begin
if new.order_type=1 then
update goods set goods_count=goods_count+new.order_count where goods_code=new.order_goods;
end if;
if new.order_type=0 then
update goods set goods_count=goods_count-new.order_count where goods_code=new.order_goods;
end if;
end
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;