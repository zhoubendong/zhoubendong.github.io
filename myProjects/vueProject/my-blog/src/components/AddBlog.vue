<template>
  <div id="add-blog">
    <h2>添加博客</h2>
    <hr>
    <form action="" v-if="!submmited">
        <label for="">博客标题</label>
        <input type="text" v-model="blog.title" required>
        <label for="">博客内容</label>
        <textarea cols="30" rows="10" v-model="blog.content" ></textarea>
        <!-- <label for="">添加图片</label>
        <input type="file" id="img">
        <div class="img"></div> -->
        <div id="checkboxes">
            <label for="">Vue.js</label>
            <input type="checkbox" value="Vue.js" v-model="blog.categories">
            <label for="">React.js</label>
            <input type="checkbox" value="React.js" v-model="blog.categories">
            <label for="">Angular.js</label>
            <input type="checkbox" value="Angular.js" v-model="blog.categories">
            <label for="">Node.js</label>
            <input type="checkbox" value="Node.js" v-model="blog.categories">
            <label for="">其他</label>
            <input type="checkbox" value="其他" v-model="blog.categories">
        </div>
        <label for="">作者：</label>
        <select v-model="blog.author">
            <option v-for="author in authors">{{author}}</option>
        </select>
        <button v-on:click.prevent="post">添加博客</button><!-- prevent阻止刷新界面 -->
    </form>
    <div v-if="submmited">
        <h3>恭喜您，您的博客发布成功\-_-/!!!</h3>
        <hr>
    </div>
    <div id="preview">
        <h3>博客总览</h3>
        <p>博客标题：{{blog.title}}</p>
        <p>博客内容：</p>
        <p>{{blog.content}}</p>
        <p>博客分类：</p>
        <ul>
            <li v-for="category in blog.categories">{{category}}</li>
        </ul>
        <p>作者：{{blog.author}}</p>
    </div>
  </div>
</template>

<script>
export default {
    //http://jsonplaceholder.typicode.com/posts 测试接口
  name: 'add-blog',
  data () {
    return {
      blog: {
          title: "",
          content: "",
          categories:[],
          author:"",
          createdate:"2",
      },
      authors: ["东羽1号","东羽2号","东羽3号","东羽4号"],
      submmited: false
    }
  },
  methods: {
    
      post: function() {//将数据发送出去
          this.blog.createdate = new Date().toLocaleDateString();
          // console.log(this.createdate)
          this.$http.post("https://myblog-77e0b.firebaseio.com/posts.json",this.blog)
            .then(function(data) {
              // console.log(this.createdate);
              this.submmited = true;

            })
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr{    
    border: 2px dotted gray;
}
#add-blog *{
  box-sizing: border-box;
}
#add-blog{
  margin:20px auto;
  max-width: 600px;
  padding: 20px;

}
label{
  display: block;
  margin: 20px 0 10px;
}
input[type="text"],textarea,select{
  display: block;
  width: 100%;
  padding: 8px;
}

#checkboxes label{
  display:inline-block;
  margin-top: 0;
}
#checkboxes input{
  display: inline-block;
  margin-right: 10px;
}
button{
  display:block;
  margin: 20px 0;
  background: crimson;
  color: #fff;
  border:0;
  padding:14px;
  border-radius:10px;
  font-size: 18px;
  cursor: pointer;
}
button:hover{
  background: rgb(104, 109, 177);
  color:#ffff;
}
#preview{
  padding:10px 20px;
  border: 10px dotted #ccc;
  margin: 30px 0;
}
h3{
  margin-top: 10px;
}
</style>
