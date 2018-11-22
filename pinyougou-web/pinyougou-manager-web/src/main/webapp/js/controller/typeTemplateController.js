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
})