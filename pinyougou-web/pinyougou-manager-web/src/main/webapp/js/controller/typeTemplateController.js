app.controller("typeTemplateController",function ($scope,$controller,baseService) {
    /* 继承父类controller */
    $controller("baseController",{$scope:$scope});

    /* 定义查询条件 */
    $scope.searchEntity = {};

    /* 分页查询 */
    $scope.search = function (page,rows) {
        baseService.findByPage("/typeTemplate/findByPage",page,rows,$scope.searchEntity)
            .then(function (response) {
                //获取返回数据
                $scope.dataList = response.data.rows;
                //更新总记录数
                $scope.paginationConf.totalItems = response.data.total;
            });
    }

    /* 获取全部品牌 */
    $scope.findBrandList = function () {
        baseService.sendGet("/brand/findBrandList")
            .then(function (response) {
                $scope.brandList = {data:response.data};
            });
    };

    /* 获取全部规格 */
    $scope.findSpecificationList = function () {
        baseService.sendGet("/specification/findSpecificationList")
            .then(function (response) {
                $scope.SpecificationList = {data:response.data};
            });
    };

    /* 新增扩展属性列表框 */
    $scope.addTableRow = function () {
        $scope.entity.customAttributeItems.push({});
    }

    /* 删除扩展属性列表框 */
    $scope.deleteTableRow = function (index) {
        $scope.entity.customAttributeItems.splice(index,1);
    }

    /* 添加模板 */
    $scope.saveOrUpdate = function () {
        //定义url
        var url = "save";
        if($scope.entity.id){
            url = "update"
        }

        baseService.sendPost("/typeTemplate/"+url,$scope.entity)
            .then(function (response) {
                if(response.data){
                    $scope.reload();
                }
            });
    }

    /* 修改模板 */
    $scope.show = function (entity) {
        $scope.entity = JSON.parse(JSON.stringify(entity));
        // 因为品牌,规格,扩展属性都是字符串类型,这里需要将字符串解析成json对象
        $scope.entity.brandIds = JSON.parse(entity.brandIds);
        $scope.entity.specIds = JSON.parse(entity.specIds);
        $scope.entity.customAttributeItems = JSON.parse(entity.customAttributeItems);
    }

    /* 删除模板 */
    $scope.delete = function () {
        if($scope.ids.length>0){
            baseService.deleteById("/typeTemplate/delete",$scope.ids)
                .then(function (response) {
                    if(response.data){
                        //清空数组
                        $scope.ids = [];
                        $scope.reload();
                    }else {
                        alert("删除失败!")
                    }
                });
        }else {
            alert("请选中需要删除的模板");
        }
    }


})