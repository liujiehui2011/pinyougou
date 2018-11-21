package com.pinyougou.sellergoods.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.github.pagehelper.ISelect;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.mapper.SpecificationMapper;
import com.pinyougou.mapper.SpecificationOptionMapper;
import com.pinyougou.pojo.Specification;
import com.pinyougou.pojo.SpecificationOption;
import com.pinyougou.service.SpecificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.List;

/**
    规格管理接口实体类
 **/
@Transactional
@Service(interfaceName ="com.pinyougou.service.SpecificationService")
public class SpecificationServiceImpl implements SpecificationService {

    @Autowired
    private SpecificationMapper specificationMapper;

    @Autowired
    private SpecificationOptionMapper specificationOptionMapper;

    /**
     * 添加方法
     *
     * @param specification
     */
    @Override
    public void save(Specification specification) {
        try {
            specificationMapper.insertSelective(specification);
            specificationOptionMapper.save(specification);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    /**
     * 修改方法
     *
     * @param specification
     */
    @Override
    public void update(Specification specification) {
        try {
            // 修改规格名称
            specificationMapper.updateByPrimaryKeySelective(specification);

            //修改规格选项表数据
            SpecificationOption specificationOption = new SpecificationOption();
            specificationOption.setSpecId(specification.getId());
            //根据SpecId将数据删除,然后重新添加
            specificationOptionMapper.delete(specificationOption);
            specificationOptionMapper.save(specification);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
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
    public Specification findOne(Serializable id) {
        return null;
    }

    /**
     * 查询全部
     */
    @Override
    public List<Specification> findAll() {
        return null;
    }

    /**
     * 多条件分页查询
     *
     * @param specification
     * @param page
     * @param rows
     */
    @Override
    public PageResult findByPage(Specification specification, int page, int rows) {
        //开始分页
        PageInfo<Specification> pageInfo = PageHelper.startPage(page,rows).doSelectPageInfo(new ISelect() {
            @Override
            public void doSelect() {
                specificationMapper.findAll(specification);
            }
        });
        return new PageResult(pageInfo.getTotal(),pageInfo.getList());
    }

    /* 根据规格主键查询规格选项 */
    @Override
    public List<SpecificationOption> findSpecOption(Long id) {
        //创建SpecificationOption对象,将id值赋值给 specId 属性,然后查询
        SpecificationOption so = new SpecificationOption();
        so.setSpecId(id);
        return specificationOptionMapper.select(so);
    }
}
