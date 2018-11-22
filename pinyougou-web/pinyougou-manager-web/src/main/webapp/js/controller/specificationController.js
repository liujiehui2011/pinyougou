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
    
    /* 保存,修改 */
    $scope.savexOrUpdate = function () {
        //定义url
        var url = "save";  //新建
        if($scope.entity.id){
            url="update";  //修改
        }
        baseService.sendPost("/specification/"+url,$scope.entity)
            .then(function (response) {
                if(response.data){
                    $scope.reload();
                }else {
                    alert("操作失败!")
                }
            })
    }

    /* 修改 */
    $scope.show = function (entity) {
        $scope.entity = entity;
        baseService.sendGet("/specification/findSpecOption?id="+entity.id)
            .then(function (response) {
                $scope.entity.specificationOptions = response.data;
            })
    }
})