<template>
  <div>
    <div id="diagramDiv2">

    </div>
    <div>
      <modal :show="isModalVisible" @close="close_modal">
      <div slot="header" style="margin-top: 5px">配置{{modal_title}}</div>
      <div slot="body" style="margin-top: 5px">
        <div>
          <el-form ref="router_form" :model="router_form" style="width: 400px" label-width="50px">
            <el-form-item label="IP">
              <el-input v-model="router_form.ip"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="router_form.password" show-password></el-input>
            </el-form-item>
          </el-form>
        </div>
        
      </div>
      <div slot="footer" style="margin-top: 5px">
        <el-button type="info" plain @click="close_modal">取消</el-button>
        <el-button type="primary" plain @click="set_router_ip(modal_title, router_form)">确定</el-button>
      </div>
    </modal>
    </div>

  </div>
</template>

<script>
import go from 'gojs'
import PC from '../assets/svg/计算机.svg'
import Router from '../assets/svg/路由器.svg'
import Switch from '../assets/svg/交换机.svg'
import modal from './modal'

export default {
  name: 'Diagram',
  components: {modal},
  mounted () {
    console.log("init diagram");
    this.init();
  },
  data () {
    return {
      interval: null,
      diagram: null,
      model: { 'class': 'go.GraphLinksModel',
        'copiesArrays': true,
        'copiesArrayObjects': true,
        'linkFromPortIdProperty': 'fromPort',
        'linkToPortIdProperty': 'toPort'
      },
      key: 0,
      isModalVisible: false,
      modal_title:'',
      router_form: {
        ip:'',
        password:''
      },
      RTA: {
        ip: '',
        password: ''
      },
      RTB: {
        ip: '',
        password: ''
      },
      RTC: {
        ip: '',
        password: ''
      },
      can_clear_interval: false,
      result: {
        can_change: false,
        index: -1,
        ip: '',
        mask: '',
      }
    }
  },

  methods: {
    init() {
      const $ = go.GraphObject.make;

      const myDiagram =
          $(go.Diagram, 'diagramDiv2',
            {
              minScale: 0.5, 
              grid: $(go.Panel, "Grid",
                $(go.Shape, "LineH", { stroke: "gray", strokeWidth: .5 }),
                $(go.Shape, "LineH", { stroke: "gray", strokeWidth: .5, interval: 10 }),
                $(go.Shape, "LineV", { stroke: "gray", strokeWidth: .5 }),
                $(go.Shape, "LineV", { stroke: "gray", strokeWidth: .5, interval: 10 })
              ),
              'grid.gridCellSize': new go.Size(30, 30),
              'draggingTool.isGridSnapEnabled': true,
              'resizingTool.isGridSnapEnabled': true,
              'rotatingTool.snapAngleMultiple': 90,
              'rotatingTool.snapAngleEpsilon': 45,
              'undoManager.isEnabled': true
            })

      var self = this;
      var nodeMenu = // context menu for each Node
        $('ContextMenu',
          makeButton('配置',
            function (e, obj) {
              console.log("配置");
              self.isModalVisible = true;
              var contextmenu = obj.part;  // the Button is in the context menu Adornment
              var part = contextmenu.adornedPart;  // the adornedPart is the Part that the context menu adorns
              var node = part.data;
              self.modal_title = node.key;

              self.interval = setInterval(function () {
                if(self.can_clear_interval) {
                  if(self.result.can_change) {
                    set_router();
                    self.result.can_change = false;
                  }
                  self.can_clear_interval = false;
                  console.log(self.interval);
                  clearInterval(self.interval)
                }
                console.log("test")
              }, 100);
            }),
      );

      myDiagram.nodeTemplateMap.add("PC", 
        $(go.Node, "Vertical",
          {
            locationSpot: new go.Spot(0.5, 0.5), locationObjectName: "SHAPE",
            resizable: true, resizeObjectName: "SHAPE"
          },
          new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Picture,
            { margin: 1, width: 50, height: 50 },
            new go.Binding("source")),
          $(go.TextBlock, "Default Text",
            { margin: 0, stroke: "black", font: "bold 12px sans-serif" },
            new go.Binding("text", "name"))
      ));

      myDiagram.nodeTemplateMap.add("Router", 
        $(go.Node, "Vertical",
          {
            locationSpot: new go.Spot(0.5, 0.5), locationObjectName: "SHAPE",
            resizable: true, resizeObjectName: "SHAPE",
            contextMenu: nodeMenu
          },
          new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Picture,
            { margin: 1, width: 50, height: 50 },
            new go.Binding("source")),
          $(go.TextBlock, "Default Text",
            { margin: 0, stroke: "black", font: "bold 12px sans-serif" },
            new go.Binding("text", "name"))
      ));

      myDiagram.nodeTemplateMap.add("Switch", 
        $(go.Node, "Vertical",
          {
            locationSpot: new go.Spot(0.5, 0.5), locationObjectName: "SHAPE",
            resizable: true, resizeObjectName: "SHAPE"
          },
          new go.Binding("location", "pos", go.Point.parse).makeTwoWay(go.Point.stringify),
          $(go.Picture,
            { margin: 1, width: 50, height: 50 },
            new go.Binding("source")),
          $(go.TextBlock, "Default Text",
            { margin: 0, stroke: "black", font: "bold 12px sans-serif" },
            new go.Binding("text", "name"))
      ));

      myDiagram.linkTemplate =
        $(go.Link,
          { routing: go.Link.Normal},
          $(go.Shape, // the link's path shape
            { strokeWidth: 3, stroke: "#555" }),
          $(go.TextBlock,
            { margin: 0, stroke: "#4682B4", font: "bold 12px sans-serif" },
          new go.Binding("text", "ip")));

      var model = $(go.GraphLinksModel);
      model.nodeDataArray = [
        {"key":"PC0", "category":"PC", "pos":"450 50", "source":PC, "name":"PC0"},
        {"key":"PC1", "category":"PC", "pos":"30 50", "source":PC, "name":"PC1"},
        {"key":"PC2", "category":"PC", "pos":"240 350", "source":PC, "name":"PC2"},
        {"key":"RTA", "category":"Router", "pos":"30 150", "source":Router, "name":"RTA"},
        {"key":"RTB", "category":"Router", "pos":"30 250", "source":Router, "name":"RTB"},
        {"key":"RTC", "category":"Router", "pos":"450 250", "source":Router, "name":"RTC"},
        {"key":"Switch0", "category":"Switch", "pos":"450 150", "source":Switch, "name":"Switch0"},
        {"key":"Switch1", "category":"Switch", "pos":"240 250", "source":Switch, "name":"Switch1"},
      ];
      model.linkDataArray = [
        {"from":"PC0", "to":"Switch0", "ip":"172.16.0.1 /24"},
        {"from":"PC1", "to":"RTA" },
        {"from":"PC2", "to":"Switch1"},
        {"from":"Switch0", "to":"RTA", "ip":"f0/1"},
        {"from":"Switch0", "to":"RTB", "ip":"f0/1"},
        {"from":"Switch0", "to":"RTC", "ip":"f0/1"},
        {"from":"RTA", "to":"RTB"},
        {"from":"Switch1", "to":"RTB", "ip":"f0/0 10.0.0.1 /8"},
        {"from":"Switch1", "to":"RTC", "ip":"f0/0 10.0.0.2 /8"},

      ]
      myDiagram.model = model;
      
      function makeButton (text, action, visiblePredicate) {
        return $('ContextMenuButton',
          $(go.TextBlock, text),
          { click: action },
          // don't bother with binding GraphObject.visible if there's no predicate
          visiblePredicate ? new go.Binding('visible', '', function (o, e) { return o.diagram ? visiblePredicate(o, e) : false }).ofObject() : {})
      }

      var self = this;
      function set_router(index) {
        myDiagram.model.setDataProperty(myDiagram.model.linkDataArray[self.result.index], "ip", "f0/1 " + self.result.ip + " " + self.result.mask);
      }

      var self = this;
      function testButton (index) {
      // self.$prompt('请输入IP', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //    //  inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
      //    // inputErrorMessage: '邮箱格式不正确'
      //   }).then(({ value }) => {
      //     self.$message({
      //       type: 'success',
      //       message: '你的邮箱是: ' + value
      //     });

      //     myDiagram.model.setDataProperty(myDiagram.model.linkDataArray[index], "ip", "f0/1 " + value);
      //     console.log(myDiagram.model.linkDataArray);
      //   }).catch(() => {
      //     self.$message({
      //       type: 'info',
      //       message: '取消输入'
      //     });       
      //   });
      }
    },

    close_modal:function() {
      this.isModalVisible = false;
      //clearInterval(this.interval)
    },

    set_router_ip(router, info) {
      var is_correct = this.check_router(router, info);
      if(is_correct) {
        if(router === "RTA") {
          this.RTA = info;
          this.result.index = 3;
        }
        if(router === "RTB") {
          this.RTB = info;
          this.result.index = 4;
        }
        if(router === "RTC") {
          this.RTC = info;
          this.result.index = 5;
        }
        this.result.ip = info.ip;
        this.result.can_change = true;
        this.router_form.ip = '';
        this.router_form.password = '';
      }
      this.can_clear_interval = true;
      this.close_modal();
    },
    check_router(router, info) {
      return true;
    }
  }

}
</script>

<style scoped>
  #diagramDiv2 {
    margin: 30px 50px; 
    width: 600px;
    height: 450px;
  }
</style>