app.factory("myBlogFactory", function($http) {

    return {

        // get all blogs
        allBlogs: function() {
            return $http.get("/admin/blogs");
        },

        // edit blog
        editBlog: function(id) {
            return $http.get("/admin/blog/" + id + "/edit");
        },

        // update blog
        updateBlog: function(blog) {
            return $http.post("/admin/blog/" + blog._id + "/update", blog);
        },

        // delete blog
        deleteBlog: function(id) {
            return $http.post("/admin/blog/" + id + "/delete");
        },

        // create blog
        createBlog: function(blog) {
            return $http.post("/admin/blog/create", blog);
        }

    }
});