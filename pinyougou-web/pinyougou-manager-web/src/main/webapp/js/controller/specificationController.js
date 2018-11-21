app.controller("specificationController",function ($scope,$controller,baseService) {
    /* 继承baseController */
    $controller("baseController",{$scope:$scope});

    /* 多条件分页查询品牌 */
    //定义查询条件对象
    $scope.searchEntity = {};

    $scope.search = function (page, rows) {
        baseService.findByPage("/specification/findByPage",page,rows,$scope.searchEntity)
            .then(function (response) {
                //获取返回数据
                $scope.dataList = response.data.rows;
                //更新总记录数
                $scope.paginationConf.totalItems = response.data.total;
            })
    }

    /* 新增规格 */
    $scope.addTableRow = function () {
        $scope.entity.specificationOptions.push({})
    }

    /* 删除规格选项 */
    $scope.deleteTableRow = function (index) {
        $scope.entity.specificationOptions.splice(index,1)
    }
    
    /* 保存 */
    $scope.saveOrUpdate = function () {
        baseService.sendPost("/specification/save",$scope.entity)
            .then(function (response) {
                if(response.data){
                    $scope.reload();
                }else {
                    alert("添加失败!")
                }
            })
    }
})