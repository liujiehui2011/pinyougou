package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.pojo.ItemCat;
import com.pinyougou.service.ItemCatService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 分类管理控制器
 **/
@RestController
@RequestMapping("/itemCat")
public class ItemCatController {

    //注入服务层
    @Reference(timeout = 10000)
    private ItemCatService itemCatService;

    @GetMapping("/findByPage")
    public PageResult findByPage(ItemCat itemCat, Integer page, Integer rows){
        return itemCatService.findByPage(itemCat,page,rows);
    }
}
