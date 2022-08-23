import {Graph, Shape} from "@antv/x6";
import GetNode from '../../components/GetNode'
import PostNode from '../../components/PostNode'
import {EdgeConfig, gridConfig, portConfig} from "./baseOther"

export default class BaseGraph {
  static graph;
  static init(graphOptions) {
    /** 创建X6画布实例 */
    const defaultConfig = this.getDefaultConfig();
    this.graph = new Graph({
      ...defaultConfig,
      ...graphOptions,
    });

    Graph.registerNode(
        "GetNode",
        {
            inherit: "vue-shape",
            component:  {
                template: `<GetNode />`,
                components: { GetNode },
            },
        }
    );
    Graph.registerNode(
      "PostNode",
        {
            inherit: "vue-shape",
            component:  {
                template: `<PostNode />`,
                components: { PostNode },
            },
        }
    );

    return this.graph
  }

  static getDefaultConfig() {
      return {
        autoResize: true,
        // resizing: {
        //     enabled: true,
        //     minWidth: 80,
        //     maxWidth: 800,
        //     minHeight: 60,
        //     maxHeight: 600,
        // },
        // 网格
        grid: {
            ...gridConfig
        },
        background: {
            color: "#F5F7FA",
        },
        /** 无限画布设置 */
        scroller: {
            enabled: true,
            pageVisible: false,
            pageBreak: false,
            pannable: true,
        },
        /** 全局连线配置 */
        connecting: {
            anchor: "center",
            connectionPoint: "anchor",
            snap: true, // 自动吸附
            allowBlank: false, // 是否允许连接到画布空白位置的点
            allowMulti: false, // 是否允许在相同的起始节点和终止之间创建多条边
            allowLoop: false, // 是否允许创建循环连线，即边的起始节点和终止节点为同一节点
            allowNode: false, // 是否允许边链接到节点（非节点上的链接桩）
            highlight: true,
            createEdge() {
                return new Shape.Edge({
                    ...EdgeConfig,
                    zIndex: 0,
                });
            },
        },
        /** 对齐线 */
        snapline: true,
        history: true, // 启动历史记录
        // 鼠标滚轮的默认行为是滚动页面
        mousewheel: {
            enabled: true,
            modifiers: ["ctrl", "meta"],
            minScale: 0.5,
            maxScale: 2,
        },
        selecting: {
            enabled: true,
            // showNodeSelectionBox: true,
        },
        keyboard: true,
        clipboard: true,
        // 高亮
        highlighting: {
            magnetAvailable: {
                name: "stroke",
                args: {
                    padding: 4,
                    attrs: {
                        strokeWidth: 4,
                        stroke: "#6a6c8a",
                    },
                },
            },
        },
    };
  }
  static getGraphData() {
    const data = this.graph.toJSON()
    const model = {
      nodes: [],
      edges: []
    };
    let tmp;
    if (data.cells) {
      tmp = data.cells;
    } else if (data.nodes || data.edges) {
      tmp = [].concat(data.nodes, data.edges);
    }
    if (tmp) {
      tmp.forEach((item) => {
        if (item.shape !== "edge") {
          model.nodes.push({...item.data, id: item.id});
        } else {
          let sourceId = item.source;
          let targetId = item.target;
          model.edges.push({
            source: sourceId,
            target: targetId,
          });
        }
      });
    }
    return model;
  }
  static getComponent() {

    // 矩形
    let rectNodeComponent = this.graph.createNode({
      shape: "rect",
      width: 60,
      height: 60,
      ports: portConfig,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },
    });


    // 椭圆
    let ellipseNodeComponent = this.graph.createNode({
      shape: "ellipse",
      width: 60,
      height: 60,
      ports: portConfig,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },

    });

    // 多边形
    let polygonNodeComponent = this.graph.createNode({
      shape: "polygon",
      width: 60,
      height: 60,
      ports: portConfig,
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
          refPoints: '0,10 10,0 20,10 10,20',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },

    });

    // 多边形-心
    let heartNodeComponent = this.graph.createNode({
      shape: "path",
      width: 60,
      height: 60,
      ports: portConfig,
      path:
        'M24.85,10.126c2.018-4.783,6.628-8.125,11.99-8.125c7.223,0,12.425,6.179,13.079,13.543c0,0,0.353,1.828-0.424,5.119c-1.058,4.482-3.545,8.464-6.898,11.503L24.85,48L7.402,32.165c-3.353-3.038-5.84-7.021-6.898-11.503c-0.777-3.291-0.424-5.119-0.424-5.119C0.734,8.179,5.936,2,13.159,2C18.522,2,22.832,5.343,24.85,10.126z',
      attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },
    });
    // Get请求
    let getNodeComponent = this.graph.createNode({
        shape: 'GetNode',
        width: 240,
        height: 60,
        ports: portConfig,
        attrs: {
            body: {
                strokeWidth: 1,
                stroke: '#5F95FF',
                fill: '#EFF4FF',
            },
            text: {
                textWrap: {
                    text: '',
                    width: -10, // 宽度减少 10px
                }
            }
        },
        data: {
          name: '',
          url: '',
          status: ''
        }

    });

    // Post请求
    let postNodeComponent = this.graph.createNode({
      shape: 'PostNode',
      width: 240,
      height: 60,
      ports: portConfig,
        attrs: {
        body: {
          strokeWidth: 1,
          stroke: '#5F95FF',
          fill: '#EFF4FF',
        },
        text: {
          textWrap: {
            text: '',
            width: -10, // 宽度减少 10px
          }
        }
      },
        data: {
          name: '',
          url: '',
          status: ''
        }

    });
    return { rectNodeComponent, ellipseNodeComponent, heartNodeComponent, postNodeComponent, getNodeComponent, polygonNodeComponent }
  }
}
