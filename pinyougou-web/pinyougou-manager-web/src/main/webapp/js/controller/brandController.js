/* 添加控制器 */
app.controller("brandController",function ($scope, brandService) {

    /* 分页指令配置信息对象 */
    $scope.paginationConf ={
        /*配置分页信息*/
        currentPage:1,  //当前页
        totalItems:0,  //总条数
        itemsPerPage:8, //页大小
        perPageOptions:[1,2,3,4,5,6,7,8,9,10], //每页显示多少

        /*当页码改变时重新加载数据*/
        onChange:function () {
            $scope.reload();
        }
    };

    /* 重新加载表数据 */
    $scope.reload = function () {
        //切换页码
        $scope.search($scope.paginationConf.currentPage,$scope.paginationConf.itemsPerPage);
    }

    /* 多条件分页查询品牌 */
    //定义查询条件对象
    $scope.searchEntity = {};

    /** 分页查询品牌信息 */
    $scope.search = function (page, rows) {

        //多条件分页查询
        brandService.findByPage("/brand/findByPage",page,rows,$scope.searchEntity)

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
        brandService.sendPost("/brand/"+url,$scope.entity)
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

    /*定义复选框选中的品牌id*/
    $scope.ids =[];

    /*为复选框 checkbox绑定点击事件*/
    $scope.updateSelection = function ($event,id) {
        //$event.target:获取选中的复选框dom元素
        //$event.target.checked 获取当前状态(选中为true,未选中为false)
        if($event.target.checked){ //选中
            //如果北选中就加入数组中
            $scope.ids.push(id)

        }else { //取消选中
            // 获取元素在数组中的索引值
            var idx = $scope.ids.indexOf(id);
            // 根据索引号删除数组中的元素
            /*
                第一个参数: 元素在数组中的索引号
                第二个参数: 删除元素个数
            * */
            $scope.ids.splice(idx,1);
        }
    };

    /* 为删除按钮绑定事件,实现批量删除*/
    $scope.delete = function () {
        if($scope.ids.length>0){
            //发送异步请求
            brandService.deleteById("/brand/delete",$scope.ids)
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