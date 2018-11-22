package com.pinyougou.manager.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.pinyougou.common.pojo.PageResult;
import com.pinyougou.pojo.Specification;
import com.pinyougou.pojo.SpecificationOption;
import com.pinyougou.service.SpecificationService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * 规格管理
 **/
@RestController
@RequestMapping("/specification")
public class SpecificationController {
    /* 注入service */
    @Reference(timeout = 10000)
    private SpecificationService specificationService;

    /* 分页查询品牌信息 */
    @GetMapping("/findByPage")
    public PageResult findByPage(Specification specification, Integer page, Integer rows){
        //** GET请求中文转码 */
        if (specification != null && StringUtils.isNoneBlank(specification.getSpecName())) {
            try {
                specification.setSpecName(new String(specification.getSpecName().getBytes("ISO8859-1"), "UTF-8"));
            }catch (Exception ex){
                ex.printStackTrace();
            }
        }
        return specificationService.findByPage(specification, page, rows);
    }

    /* 保存 */
    @PostMapping("/save")
    public boolean save(@RequestBody Specification specification){
        try {
            specificationService.save(specification);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }


    /* 根据规格主键查询规格选项 */
    @GetMapping("/findSpecOption")
    public List<SpecificationOption> findSpecOption(Long id){
        return specificationService.findSpecOption(id);
    }


    /* 保存 */
    @PostMapping("/update")
    public boolean update(@RequestBody Specification specification){
        try {
            specificationService.update(specification);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }

    @GetMapping("/findSpecificationList")
    public List<Map<String,Object>> findSpecificationList(){
        return specificationService.findAllByIdAndName();
    }
}
