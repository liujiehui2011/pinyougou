package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.pinyougou.mapper.BrandMapper;
import com.pinyougou.pojo.Brand;
import com.pinyougou.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 *  品牌服务接口实现类
 **/
@Transactional
@Service(interfaceName = "com.pinyougou.service.BrandService")
public class BrandServiceImpl implements BrandService {

    //注入数据访问接口
    @Autowired
    private BrandMapper brandMapper;
    @Override
    public List<Brand> findAll() {
        //调用数据访问层方法,查询数据库
        return brandMapper.findAll();
    }
}
