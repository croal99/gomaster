<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <div class="panel-body">
      <el-table :data="$store.state.host_list" v-loading="load_data" element-loading-text="拼命加载中" border style="width: 100%;">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <!-- <el-table-column prop="id" label="编号" width="80">
        </el-table-column> -->
        <el-table-column prop="hostname" label="Host Name">
        </el-table-column>
        <el-table-column prop="osname" label="OS Name" width="200">
        </el-table-column>
        <!-- <el-table-column prop="osversion" label="OS Version" width="130">
        </el-table-column> -->
        <el-table-column prop="systemtype" label="System Type" width="130">
        </el-table-column>
        <el-table-column label="操作" width="220">
          <template slot-scope="props">
            <router-link :to="{name: 'checkpointEdit', params: {id: props.row.id}}" tag="span">
              <el-button type="success" size="mini" icon="edit">编辑</el-button>
            </router-link>
            <el-button type="danger" size="mini" icon="delete" @click="delete_data(props.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
      </bottom-tool-bar>
    </div>
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
  </div>
</template>

<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";

export default {
  data() {
    return {
      // host_list: [],
      //请求时的loading效果
      load_data: false,
      //批量选择数组
      batch_select: []
    };
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    // console.log(this)
    // console.log(this.host_list)
  },
  methods: {
    delete_data(checkpoint) {
      this.$confirm("此操作将删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$store.commit('del_checkpoint', checkpoint.id);
        })
        .catch(() => {});
    },
    //刷新
    on_refresh() {
      this.get_table_data();
    },

    //获取数据
    get_table_data() {
      console.log("get table data")
      this.$fetch.api_host
        .list({})
        .then(({code, data, msg}) => {
          console.log('get list', data);
          this.$store.state.host_list = data
          if (code>0) {
            MessageBox('出错了！', msg);
          }
          console.log(this.$store.state.host_list)
        })
    },

    //批量选择
    on_batch_select(val) {
      this.batch_select = val;
    },
    on_batch_del() {}
  }
};
</script>
