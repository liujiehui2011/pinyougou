app.controller("itemCatController",function ($scope,$controller,baseService) {
    $controller("baseController",{$scope:$scope})

    /* 定义父级id */
    $scope.searchEntity = {parentId:0};

    $scope.grade = 1;

    /* 下级菜单 */
    $scope.juniorEntity = function (entity,grade) {
        $scope.grade = grade;
        if(grade==1){
            $scope.itemCat_1 = null;
            $scope.itemCat_2 = null;

        }else if(grade==2){
            $scope.itemCat_1 = entity;
            $scope.itemCat_2 = null;
        }else {
            $scope.itemCat_2 = entity;
        }
        $scope.searchEntity = {parentId:entity.id}
        $scope.reload();
    }

    $scope.search = function (page,rows) {
        baseService.findByPage("/itemCat/findByPage",page,rows,$scope.searchEntity)
            .then(function (response) {
                $scope.dataList = response.data.rows;
                //更新总记录数
                $scope.paginationConf.totalItems = response.data.total;
            })
    }
});