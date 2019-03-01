<template>
  <div v-theme:column="'wide'" id="show-blogs">
    <h2>博客总览</h2>
    <hr>
    请搜索标题关键字查询：<input type="text" v-model="search" placeholder="搜索">
    <div v-for="blog in filteredBlogs" class="single-blog">
      <h2 v-rainbow>{{blog.title | to-uppercase}}</h2>
      <div class="wapper"> 
        <img src="../assets/时间.png">
        <span>创建时间：{{blog.createdate}}</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <img src="../assets/icon_principal.png">
        <span>作者：{{blog.author}}</span>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
        <img src="../assets/icon_workfile_line.png">
        <span>分类：</span>
        <ul>
                <li v-for="category in blog.categories" :key="category">{{category}}</li>
        </ul>
      </div>
      <article>
        {{blog.content | snippet}}
      </article>
      <div class="read">
        <router-link v-bind:to="'/blog/'+blog.id">阅读全文</router-link>
      </div>     
    </div>
  </div>
</template>

<script>
export default {
  name: 'show-blogs',
  data () {
    return {
      blogs:[],
      search:""
    }
  },
  created(){
    this.$http.get("https://wd7869756315ozmdzd.wilddogio.com/posts.json")//本地的json文件只能放在static文件夹下
        .then(function(data){
          // console.log(data.json());
          // this.blogs = data.body.slice(0,10);// 只展示第0至10条
          // console.log(this.blogs);
          return data.json()
        })          
        .then(function(data){
          let blogsArray =[];
          for(let key in data){
            // console.log(data[key]);
            data[key].id = key;
            blogsArray.push(data[key]);
          }
          // console.log(blogsArray);
          this.blogs = blogsArray.reverse();
          console.log(this.blogs)
        })
  },
      //    搜索功能 
  computed: {
    filteredBlogs: function() {
      return this.blogs.filter((blog) => {
        return blog.title.match(this.search);
      });
    }
  },
    //  当前组件下的局部过滤器
  filters: {
    toUppercase: function(value) {
        return value.toUpperCase().slice(0,40);//   让标题最多展示的长度
    },
    // 'snippet':function(value){
    //     return value.slice(0,200) + ' ...';
    // }
     snippet(value){
        return value.slice(0,200) + ' ...';
    }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span{
  color:#666;
}
#show-blogs{
  max-width: 800px;
  margin: 0 auto;
}
.single-blog{
  padding: 20px;
  margin: 20px 0;
  box-sizing: border-box;
  background: #eee;
  border: 1px dotted #777;
}
.single-blog h2{
  margin: 15px 0 10px 0;
}
.wapper{
  margin: 5px 0 16px 0;
}
img{
  width: 35px;
  height: 35px;
  vertical-align: -6px;
}
ul,li{
    text-decoration: none;
    display: inline-block;
    margin:0;
    padding: 0;
    color:#666;
}
ul{
    margin-bottom: 15px;
}
li{
    margin: 0 8px
}
.single-blog  article{
  font-size: 20px;
  color: #444;
}
input{
  display: inline-block;
  width:60%;
  padding: 7px;
  box-sizing: border-box;

}
.read{
  margin-top: 15px;
  width:70px;
  height:35px;
  background: #2c3e50;
  text-align:center;
  line-height:35px;
  padding: 3px 10px;
  border-radius: 7px;
}
.read a{
  text-decoration:none;
  color:#fff;
}
.read:hover{
  background: #3f576e;
}
hr{    
    margin-bottom: 30px;
    border: 2px dotted gray;
}
</style>
