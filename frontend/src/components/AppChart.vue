<template>
  <div class="chart" :style="`height: ${height}px`">
    <div class="leftbar" @click="generate">
      <span
        class="value"
        :class="
          index === 0 ? 'first-value' : (index === leftBarKeys.length - 1 ? 'last-value' : null)
        "
        v-for="(key, index) in leftBarKeys"
        v-bind:key="key"
      >{{key}}</span>
    </div>

    <canvas
      ref="canvas"
      class="canvas"
    ></canvas>
  </div>
</template>

<script>
export default {
  name: 'AppChart',
  props: {
    height: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      chartData: [
        { key: '1', value: 0.5 },
      ],
      leftBarKeys: ['75-100%', '50-75%', '25-50%', '0-25%'],
      ctx: null,
    }
  },
  methods: {
    generate() {
      this.chartData = []

      // Generate random values
      for (let i = 1; i < 20; i += 1) {
        this.chartData.push({
          key: `i${i}`,
          value: Math.round(Math.random() * 100),
        })
      }

      const { ctx, chartData, $refs: { canvas } } = this

      const canvasWidth = canvas.offsetWidth

      canvas.width = canvasWidth
      canvas.height = canvas.offsetHeight

      this.ctx.strokeStyle = '#1e2328'

      this.leftBarKeys.forEach((_, index) => {
        const y = (canvas.height / this.leftBarKeys.length) * (index + 1)

        this.ctx.beginPath()
        this.ctx.moveTo(0, y)
        this.ctx.lineTo(canvas.offsetWidth, y)
        this.ctx.stroke()
      })

      this.chartData.forEach((_, index) => {
        const x = (canvas.width / this.chartData.length) * (index + 1)

        this.ctx.beginPath()
        this.ctx.moveTo(x, 0)
        this.ctx.lineTo(x, canvas.height)
        this.ctx.stroke()
      })

      ctx.strokeStyle = '#01ff87'
      ctx.lineWidth = 3

      ctx.shadowColor = 'rgba(1, 255, 135, .5)'
      ctx.shadowBlur = 15
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 0

      chartData.forEach(({ value }, index, data) => {
        const x = (canvasWidth / chartData.length) * index
        const y = canvas.height - ((canvas.height / 100) * (value))

        if (!data[index + 1]) {
          return
        }

        const { value: nextValue } = data[index + 1]

        const nextX = (canvasWidth / chartData.length) * (index + 1)
        const nextY = canvas.height - ((canvas.height / 100) * (nextValue))

        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(nextX, nextY)
        ctx.stroke()
      })
    },
  },
  mounted() {
    const { canvas } = this.$refs

    this.ctx = canvas.getContext('2d')

    this.generate()
  },
}
</script>

<style lang="less" scoped>
.chart {
  width: 100%;
  background: #13171a;
  color: #576c80;
  position: relative;
  user-select: none;

  border: 1px solid #1d2327;
  border-left: 0;
  border-right: 0;

  .leftbar {
    position: absolute;
    width: 60px;
    height: 100%;
    background: rgba(21, 25, 28, .9);
    box-shadow: 15px 0 20px rgba(0, 0, 0, 0.06);

    font-size: 13px;

    left: 0;
    top: 0;

    display: flex;
    flex-direction: column;
    align-content: space-between;

    .value {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
