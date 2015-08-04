/**
 * All blogs/Delete Blog Controller
 */
app.controller("ListDeleteCtrl", function($scope, $state, myBlogFactory) {

    $scope.blog = {};
    $scope.modal = false;

    // Get All Blogs
    myBlogFactory.allBlogs().then(function(res){
        $scope.blogs = res.data;
    });

    // Cancel Modal
    $scope.cancelModal = function() {
        $scope.modal = false;
    };

    // Show Delete Modal
    $scope.showDeleteModal = function(id) {
        $scope.modal = true;
        $scope.modal = myBlogFactory.editBlog(id).then(function(res) {
            $scope.blog = res.data;
        });
    };

    // Delete Blog
    $scope.deleteBlog = function(id) {
        myBlogFactory.deleteBlog(id).then(function(result) {
            if(result.data.success) {
                $state.go($state.current, {}, { reload: true });
            }
        });
    };

});

/**
 * Blog Create/Update Controller
 */
app.controller("CreateUpdateCtrl", function($scope, $state, $stateParams, myBlogFactory) {

    // get blog by id if update page
    if($stateParams.id) {
        myBlogFactory.editBlog($stateParams.id).then(function(res) {
            $scope.blog = res.data;
        });
    }

    // Create blog
    $scope.createBlog = function() {
        myBlogFactory.createBlog($scope.blog).then(function(result) {
            if(result.data.success) {
                $scope.blog = {};
                $state.go("admin-all-blogs");
            }
        });
    };

    // Update blog
    $scope.updateBlog = function(blog) {
        myBlogFactory.updateBlog(blog).then(function(result) {
            if(result.data.success) {
                $state.go("admin-all-blogs");
            }
        });
    };
});
