package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.mapper.BrandMapper;
import com.pinyougou.pojo.Brand;
import com.pinyougou.service.BrandService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
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

    /**
     * 添加方法
     *
     * @param brand
     */
    @Override
    public void save(Brand brand) {
        brandMapper.insertSelective(brand);
    }

    /**
     * 修改方法
     *
     * @param brand
     */
    @Override
    public void update(Brand brand) {
        brandMapper.updateByPrimaryKeySelective(brand);
    }

    /**
     * 根据主键id删除
     *
     * @param id
     */
    @Override
    public void delete(Serializable id) {

    }

    /**
     * 批量删除
     *
     * @param ids
     */
    @Override
    public void deleteAll(Serializable[] ids) {

    }

    /**
     * 根据主键id查询
     *
     * @param id
     */
    @Override
    public Brand findOne(Serializable id) {
        return null;
    }

    @Override
    public List<Brand> findAll() {
        //调用数据访问层方法,查询数据库
        return brandMapper.selectAll();

      /*  PageInfo<Brand> pageInfo = PageHelper.startPage(1, 5)
                .doSelectPageInfo(new ISelect() {
                    @Override
                    public void doSelect() {
                        brandMapper.findAll();
                    }
                });
        System.out.println("总记录数：" + pageInfo.getTotal());
        System.out.println("总页数：" + pageInfo.getPages());
        return pageInfo.getList();*/
    }

    /**
     * 多条件分页查询
     *
     * @param brand
     * @param page
     * @param rows
     */
    @Override
    public PageResult findByPage(Brand brand, int page, int rows) {
        //开始分页
        PageInfo<Brand> pageInfo= PageHelper.startPage(page,rows).doSelectPageInfo(new ISelect() {
            @Override
            public void doSelect() {
                brandMapper.findAll(brand);
            }
        });
        return new PageResult(pageInfo.getTotal(),pageInfo.getList());
    }
}
