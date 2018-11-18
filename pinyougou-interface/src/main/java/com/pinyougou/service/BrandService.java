package com.pinyougou.service;

import com.pinyougou.pojo.Brand;

import java.util.List;

/**
 * 品牌服务接口类
 */
public interface BrandService {
    /* 查询全部品牌 */
    List<Brand> findAll();
}
