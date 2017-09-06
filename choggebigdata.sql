-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: 2017-09-06 11:11:10
-- 服务器版本： 5.5.48-log
-- PHP Version: 7.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `choggebigdata`
--

-- --------------------------------------------------------

--
-- 表的结构 `cbd_datasource`
--

CREATE TABLE `cbd_datasource` (
  `id` int(11) NOT NULL,
  `file_name` varchar(50) NOT NULL,
  `A` varchar(250) DEFAULT NULL,
  `B` varchar(250) DEFAULT NULL,
  `C` varchar(250) DEFAULT NULL,
  `D` varchar(250) DEFAULT NULL,
  `E` varchar(250) DEFAULT NULL,
  `F` varchar(250) DEFAULT NULL,
  `G` varchar(250) DEFAULT NULL,
  `H` varchar(250) DEFAULT NULL,
  `I` varchar(250) DEFAULT NULL,
  `J` varchar(250) DEFAULT NULL,
  `K` varchar(250) DEFAULT NULL,
  `L` varchar(250) DEFAULT NULL,
  `M` varchar(250) DEFAULT NULL,
  `N` varchar(250) DEFAULT NULL,
  `O` varchar(250) DEFAULT NULL,
  `P` varchar(250) DEFAULT NULL,
  `user` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_del` int(11) NOT NULL COMMENT '0--del 1--exist'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `cbd_datasource_name`
--

CREATE TABLE `cbd_datasource_name` (
  `id` int(11) NOT NULL,
  `file_name` varchar(50) NOT NULL,
  `column_name` varchar(250) NOT NULL,
  `column_value` varchar(250) NOT NULL,
  `user` varchar(50) NOT NULL,
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status_del` int(11) NOT NULL COMMENT '0--del 1--exist'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `cbd_data_store_filename`
--

CREATE TABLE `cbd_data_store_filename` (
  `id` int(11) NOT NULL,
  `file_name` varchar(50) NOT NULL,
  `user` varchar(50) NOT NULL,
  `remark` varchar(1000) NOT NULL,
  `status` int(11) NOT NULL,
  `status_del` int(11) NOT NULL COMMENT '0--del 1--exist'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- 表的结构 `cbd_module`
--

CREATE TABLE `cbd_module` (
  `id` int(11) NOT NULL,
  `module_code` varchar(20) NOT NULL COMMENT '模块代码',
  `module_name` varchar(100) NOT NULL COMMENT '模块名称',
  `parent_code` varchar(20) NOT NULL COMMENT '父模块代码',
  `module_url` varchar(100) NOT NULL COMMENT '模块url',
  `pid` int(11) NOT NULL COMMENT '父类id',
  `mid` int(11) NOT NULL COMMENT '自己的id',
  `role_id` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `cbd_module`
--

INSERT INTO `cbd_module` (`id`, `module_code`, `module_name`, `parent_code`, `module_url`, `pid`, `mid`, `role_id`) VALUES
(1, 'USERIN', '本站用户', 'USERGROUP', '/userIn', 2, 0, 0),
(2, 'USERGROUP', '用户组', 'USERMANAGE', '', 0, 2, 0),
(3, 'USROUT', '第三方用户', 'USERGROUP', '/userout', 2, 0, 0),
(4, 'SYSTEMMANAGE', '系统设置', 'PARENT', '', 0, 0, 0),
(5, 'MANAGEGROUP', '管理组', 'USERMANAGE', '', 4, 0, 0),
(6, 'ROLEMANAGE', '角色管理', 'MANAGEGROUP', '/rolemanage', 5, 0, 0),
(7, 'MANAGER', '管理员管理', 'MANAGEGROUP', '/adminmanage', 5, 0, 0),
(8, 'USERMANAGE', '用户管理', 'PARENT', '', 0, 1, 0),
(9, 'YOUQINGLIANJIE', '友情链接', 'CHAJIANMANAGE', '', 0, 0, 0),
(10, 'NOTE', '提示', 'CHAJIANMANAGE', '', 0, 0, 0),
(11, 'MENUMANAGE', '菜单管理', 'PARENT', '', 0, 0, 0),
(12, 'CHAJIANMANAGE', '插件管理', 'PARENT', '', 0, 0, 0);

-- --------------------------------------------------------

--
-- 表的结构 `cbd_privilege`
--

CREATE TABLE `cbd_privilege` (
  `privilege_id` int(11) NOT NULL,
  `privilege_code` varchar(50) NOT NULL,
  `privilege_name` varchar(50) NOT NULL,
  `module_code` varchar(50) NOT NULL,
  `role_code` varchar(50) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '-- 0 删除  --1存在'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `cbd_privilege`
--

INSERT INTO `cbd_privilege` (`privilege_id`, `privilege_code`, `privilege_name`, `module_code`, `role_code`, `status`) VALUES
(1, 'SEEUSER', '查看用户信息', 'USERIN', '2', 1),
(2, 'SEEUSER', '查看用户信息', 'USERIN', '1', 1),
(3, 'SEEUSEROUT', '查看第三方用户信息', 'USROUT', '1', 1),
(4, 'SEEUSEROUT', '查看第三方用户信息', 'USROUT', '2', 1),
(5, 'SEEROLEMANADE', '查看角色管理', 'ROLEMANAGE', '', 1),
(6, 'SEEROLEMANADE', '查看角色管理', 'ROLEMANAGE', '2', 1),
(7, 'ADDROLE', '添加角色', 'ROLEMANAGE', '2', 1),
(8, 'SEEMANAGER', '查看管理员', 'MANAGER', '', 1),
(9, 'SEEMANAGER', '查看管理员', 'MANAGER', '2', 1),
(10, 'ADDMANAGER', '添加管理员', 'MANAGER', '2', 1),
(11, 'USERMANAGE', '用户管理', 'USERMANAGE', '1', 1),
(12, 'USERMANAGE', '用户管理', 'USERMANAGE', '2', 1),
(13, 'USERGROUP', '用户组', 'USERGROUP', '1', 1),
(14, 'USERGROUP', '用户组', 'USERGROUP', '2', 1),
(15, 'MANAGEGROUP', '管理组', 'MANAGEGROUP', '', 0),
(16, 'MANAGEGROUP', '管理组', 'MANAGEGROUP', '2', 1),
(17, 'USERIN', '本站用户', 'USERIN', '1', 1),
(18, 'USERIN', '本站用户', 'USERIN', '2', 1),
(19, 'USROUT', '第三方用户', 'USROUT', '1', 1),
(20, 'USROUT', '第三方用户', 'USROUT', '2', 1),
(21, 'ROLEMANAGE', '角色管理', 'ROLEMANAGE', '', 1),
(22, 'ROLEMANAGE', '角色管理', 'ROLEMANAGE', '2', 1),
(23, 'MANAGER', '管理员管理', 'MANAGER', '', 1),
(24, 'MANAGER', '管理员管理', 'MANAGER', '2', 1),
(25, 'CHAJIANMANAGE', '插件管理', 'CHAJIANMANAGE', '2', 1),
(26, 'YOUQINGLIANJIE', '友情链接', 'YOUQINGLIANJIE', '2', 1),
(27, 'NOTE', '提示', 'NOTE', '2', 1),
(28, 'SYSTEMMANAGE', '系统设置', 'SYSTEMMANAGE', '2', 1),
(29, 'MENUMANAGE', '菜单管理', 'MENUMANAGE', '2', 1);

-- --------------------------------------------------------

--
-- 表的结构 `cbd_role`
--

CREATE TABLE `cbd_role` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL COMMENT '角色名',
  `status` tinyint(1) NOT NULL COMMENT '状态--1为存在 --0 为删除',
  `remark` varchar(1000) NOT NULL COMMENT '备注',
  `create_time` date NOT NULL COMMENT '生成时间',
  `update_time` date NOT NULL COMMENT '更新时间',
  `role_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `cbd_role`
--

INSERT INTO `cbd_role` (`id`, `name`, `status`, `remark`, `create_time`, `update_time`, `role_id`) VALUES
(1, '超级管理员', 1, '拥有最高权限', '2017-01-03', '2017-01-03', 2),
(2, '普通管理员', 1, '只有查看功能', '2017-01-27', '2017-01-27', 1),
(3, 'a', 0, '阿达', '2017-01-04', '0000-00-00', 0),
(4, 'fuck', 0, '123', '2017-01-04', '0000-00-00', 0),
(5, 'aaa', 0, '', '2017-01-08', '0000-00-00', 0),
(6, '管理员', 1, '默认是第一级别的管理员', '2017-01-11', '0000-00-00', 1);

-- --------------------------------------------------------

--
-- 表的结构 `cbd_users`
--

CREATE TABLE `cbd_users` (
  `id` int(11) NOT NULL COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '用户名',
  `password` varchar(1000) NOT NULL COMMENT '密码',
  `mail` varchar(50) NOT NULL COMMENT '邮箱',
  `phone` varchar(20) NOT NULL COMMENT '电话',
  `status` int(1) NOT NULL COMMENT '状态 0--删除 1--存在 2--拉黑',
  `role` int(1) NOT NULL COMMENT '角色 0--普通用户 1--管理员 2--超级用户',
  `last_login_ip` varchar(20) NOT NULL,
  `last_login_time` varchar(50) NOT NULL,
  `create_time` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `cbd_users`
--

INSERT INTO `cbd_users` (`id`, `name`, `password`, `mail`, `phone`, `status`, `role`, `last_login_ip`, `last_login_time`, `create_time`) VALUES
(1, 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '13622998933', 1, 2, '58.208.242.9', '2017-03-31 20:57:16', '2017-01-01 15:10:16'),
(4, 'locqj', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '15501526809', 1, 2, '180.106.31.205', '2017-01-10 09:16:05', '2017-01-01 18:10:16'),
(6, 'chenqingjie', '979f95f7283800e0ce724d02ca121ea4', 'locqj@163.com', '18021633835', 1, 0, '121.236.82.134', '2017-01-03 15:20:21', '2017-01-03 15:10:16'),
(7, 'fusky', '83b189bc57fd1753d85a82ef8fb94295', '1615388088@qq.com', '18852963680', 1, 0, '114.218.109.89', '2017-01-07 14:10:58', '2017-01-03 20:16:55'),
(8, 'userAdmin', 'e10adc3949ba59abbe56e057f20f883e', 'ccc@163.com', '', 1, 0, '58.208.242.9', '2017-03-31 19:44:38', '2017-01-04 08:07:09'),
(9, 'user', 'e10adc3949ba59abbe56e057f20f883e', 'user@163.com', '', 1, 1, '58.208.242.9', '2017-03-31 20:50:03', '2017-01-04 08:09:59'),
(10, 'user1', 'e10adc3949ba59abbe56e057f20f883e', 'user1@163.com', '', 1, 0, '112.3.196.192', '2017-07-30 00:02:06', '2017-01-04 08:10:50'),
(11, 'choggle', 'a1bac3860cd9eee33fd10c90087bb927', '1615388088@qq.com', '17602577680', 1, 0, '49.64.138.164', '', '2017-01-12 17:06:39'),
(26, 'yolanda', '21aee6fc8b73e6db0e9a31699652cb9d', 'xuqy@565tech.com', '18852951653', 1, 0, '223.166.224.243', '2017-02-13 16:12:16', '2017-01-15 09:44:45'),
(27, 'iamfather', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '18902662962', 1, 0, '14.123.160.234', '2017-02-13 15:13:04', '2017-02-13 15:12:55'),
(28, 'chenqingjie', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '15501526809', 1, 0, '58.208.242.9', '2017-03-31 17:02:03', '2017-03-31 16:50:56'),
(29, 'chenqingjie', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '15501526809', 1, 0, '58.208.242.9', '2017-03-31 17:02:03', '2017-03-31 16:55:25'),
(30, 'chenqingjie', 'd41d8cd98f00b204e9800998ecf8427e', 'locqj@163.com', '15501526809', 1, 0, '58.208.242.9', '', '2017-03-31 16:55:54'),
(31, 'chenqingjie', 'd41d8cd98f00b204e9800998ecf8427e', 'locqj@163.com', '15501526809', 1, 0, '58.208.242.9', '', '2017-03-31 16:55:57'),
(32, 'chenqingjie', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '15501526809', 1, 0, '58.208.242.9', '2017-03-31 17:02:03', '2017-03-31 17:00:32'),
(33, 'chenqingjie', 'e10adc3949ba59abbe56e057f20f883e', 'locqj@163.com', '15501526809', 1, 0, '58.208.242.9', '2017-03-31 17:02:03', '2017-03-31 17:00:47');

-- --------------------------------------------------------

--
-- 表的结构 `cbd_yanzheng`
--

CREATE TABLE `cbd_yanzheng` (
  `id` int(11) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `yanma` int(10) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 转存表中的数据 `cbd_yanzheng`
--

INSERT INTO `cbd_yanzheng` (`id`, `phone`, `yanma`, `create_time`) VALUES
(1, '15501526809', 6832, '2016-12-31 06:15:29'),
(3, '18852951611', 7806, '2016-12-31 00:00:00'),
(14, '18852963680', 8113, '2016-12-31 00:00:00'),
(15, '18852981967', 4681, '2017-01-01 14:00:00'),
(16, '13502275333', 2903, '0000-00-00 00:00:00'),
(17, '18021633835', 6240, '0000-00-00 00:00:00'),
(18, '17602577680', 6903, '0000-00-00 00:00:00'),
(20, '18852951653', 3537, '0000-00-00 00:00:00'),
(21, '18902662962', 1307, '0000-00-00 00:00:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cbd_datasource`
--
ALTER TABLE `cbd_datasource`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbd_datasource_name`
--
ALTER TABLE `cbd_datasource_name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbd_data_store_filename`
--
ALTER TABLE `cbd_data_store_filename`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbd_module`
--
ALTER TABLE `cbd_module`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbd_privilege`
--
ALTER TABLE `cbd_privilege`
  ADD PRIMARY KEY (`privilege_id`);

--
-- Indexes for table `cbd_role`
--
ALTER TABLE `cbd_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbd_users`
--
ALTER TABLE `cbd_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cbd_yanzheng`
--
ALTER TABLE `cbd_yanzheng`
  ADD PRIMARY KEY (`id`);

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `cbd_datasource`
--
ALTER TABLE `cbd_datasource`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `cbd_datasource_name`
--
ALTER TABLE `cbd_datasource_name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `cbd_data_store_filename`
--
ALTER TABLE `cbd_data_store_filename`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- 使用表AUTO_INCREMENT `cbd_module`
--
ALTER TABLE `cbd_module`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- 使用表AUTO_INCREMENT `cbd_privilege`
--
ALTER TABLE `cbd_privilege`
  MODIFY `privilege_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- 使用表AUTO_INCREMENT `cbd_role`
--
ALTER TABLE `cbd_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- 使用表AUTO_INCREMENT `cbd_users`
--
ALTER TABLE `cbd_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键', AUTO_INCREMENT=34;
--
-- 使用表AUTO_INCREMENT `cbd_yanzheng`
--
ALTER TABLE `cbd_yanzheng`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
