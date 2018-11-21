/* 添加控制器 */
app.controller("brandController",function ($scope,$controller, baseService) {

    /** 指定继承baseController */
    $controller('baseController',{$scope:$scope});

    /* 多条件分页查询品牌 */
    //定义查询条件对象
    $scope.searchEntity = {};

    /** 分页查询品牌信息 */
    $scope.search = function (page, rows) {

        //多条件分页查询
        baseService.findByPage("/brand/findByPage",page,rows,$scope.searchEntity)

        .then(function (response) {
            $scope.dataList = response.data.rows;
            /* 更新总记录数 */
            $scope.paginationConf.totalItems=response.data.total;
        });
    };

    /* 添加 和 修改品牌 */
    $scope.saveOrUpdate = function(){
        /* 定义请求url */
        var url = "save";  //添加
        if($scope.entity.id){
            url="update";  //修改
        }
        baseService.sendPost("/brand/"+url,$scope.entity)
            .then(function(response){
                if(response.data){
                    /*添加成功,重新查询全部数据*/
                    $scope.reload();
                    if(url=="save"){
                        alert("添加成功");
                    }else {
                        alert("修改成功");
                    }
                }
            },function (response) {
                alert("添加失败!");
            });
    };

    /* 修改 */
    $scope.show = function(entity){
        $scope.entity=JSON.parse(JSON.stringify(entity));
        //$scope.entity=entity;
    };


    /* 为删除按钮绑定事件,实现批量删除*/
    $scope.delete = function () {
        if($scope.ids.length>0){
            //发送异步请求
            baseService.deleteById("/brand/delete",$scope.ids)
            .then(function (response) {
                if(response.data){
                    //清空数组
                    $scope.ids=[];
                    //重新加载数据
                    $scope.reload();
                }else {
                    alert("删除失败")
                }
            });
        }else {
            alert("请选要删除的品牌");
        }
    };
})