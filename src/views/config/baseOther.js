const attrs = {
    circle: {
        r: 4,
        magnet: true,
        stroke: '#2D8CF0',
        strokeWidth: 1,
        fill: '#fff',
    },
}

// 连接桩配置
const portConfig = {
    groups: {
        top: {
            position: 'top',
            attrs,
        },
        bottom: {
            position: 'bottom',
            attrs,
        },
        left: {
            position: 'left',
            attrs,
        },
        right: {
            position: 'right',
            attrs,
        },
    },
    items: [
        {
            id: 'portTop',
            group: 'top',
        },
        {
            id: 'portBottom',
            group: 'bottom',
        },
        {
            id: 'portLeft',
            group: 'left',
        },
        {
            id: 'portRight',
            group: 'right',
        }
    ],
}

// 边配置
let EdgeConfig = {
    attrs: {
        line: {
            stroke: '#1280FF', // 指定 path 元素的填充色
            strokeDasharray: 3,//虚线间距
            targetMarker: {
                name: 'classic', // 实心箭头
                size: 8
            },
            strokeWidth: 1,
            style: {
                animation: 'ant-line 200s infinite linear',
            },
        },

    },
    connector: 'rounded',
    router:  "manhattan",
}

// 网格配置
let gridConfig = {
    type: "doubleMesh",
    size: 10,
    visible: true,
    args: [
        {
            color: "#E7E8EA",
            thickness: 1,
        },
        {
            color: "#CBCED3",
            thickness: 1,
            factor: 5,
        },
    ],
}
export { EdgeConfig, gridConfig, portConfig }
