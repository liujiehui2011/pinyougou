package com.pinyougou.mapper;

import com.pinyougou.pojo.Brand;
import tk.mybatis.mapper.common.Mapper;

import java.util.List;

/**
    品牌数据访问接口
 **/
public interface BrandMapper extends Mapper<Brand> {

    List<Brand> findAll(Brand brand);
}
