'use client'
import { useState, useEffect } from 'react'
import { Wind, Pause, Play, RotateCcw } from 'lucide-react'

export default function BreathingGuide() {
  // 状态管理
  const [isActive, setIsActive] = useState(false)
  const [count, setCount] = useState(4)
  const [currentStep, setCurrentStep] = useState('吸气') // 简化步骤提示

  // 呼吸练习步骤：吸气(4秒)、屏息(7秒)、呼气(8秒)
  const steps = [
    { name: '吸气', duration: 4, color: 'from-green-400 to-emerald-400' },
    { name: '屏息', duration: 7, color: 'from-blue-400 to-cyan-400' },
    { name: '呼气', duration: 8, color: 'from-purple-400 to-pink-400' }
  ]

  // 重置练习
  const resetExercise = () => {
    setIsActive(false)
    setCount(4)
    setCurrentStep('吸气')
  }

  // 主计时器逻辑 - 大幅简化
  useEffect(() => {
    let timer = null

    if (isActive) {
      console.log('开始呼吸练习')
      timer = setInterval(() => {
        setCount(prev => {
          if (prev <= 1) {
            // 简单循环：4 -> 7 -> 8 -> 4...
            setCurrentStep(currentStep === '吸气' ? '屏息' :
                          currentStep === '屏息' ? '呼气' : '吸气')
            return currentStep === '吸气' ? 7 :
                   currentStep === '屏息' ? 8 : 4
          }
          return prev - 1
        })
      }, 1000)
    }

    // 清理函数
    return () => {
      if (timer) {
        console.log('停止呼吸练习')
        clearInterval(timer)
      }
    }
  }, [isActive, currentStep])

  // 当前步骤的颜色
  const currentColor = steps.find(step => step.name === currentStep)?.color || 'from-green-400 to-emerald-400'

  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl shadow-xl p-6 border border-emerald-100">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mr-4">
            <Wind className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-800">呼吸放松练习</h3>
            <p className="text-gray-600">简化版呼吸法</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={resetExercise}
            className="p-3 bg-white rounded-xl border border-gray-200 hover:bg-gray-50"
            title="重置"
          >
            <RotateCcw className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={() => {
              console.log('点击按钮，当前状态:', isActive, '将变为:', !isActive)
              setIsActive(!isActive)
            }}
            className={`p-3 rounded-xl ${
              isActive
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-emerald-500 hover:bg-emerald-600 text-white'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <div className={`w-64 h-64 mx-auto rounded-full flex items-center justify-center mb-6 transition-all ${isActive ? 'animate-breathe' : ''} bg-gradient-to-r ${currentColor}`}>
          <div className="text-center">
            <div className="text-7xl font-bold text-white mb-2">{count}</div>
            <div className="text-xl font-semibold text-white">
              {isActive ? `${currentStep}...` : '准备开始'}
            </div>
          </div>
        </div>

        <p className="text-gray-700 mb-4">
          {isActive ? '专注于呼吸，放松身心' : '点击开始按钮进行呼吸练习'}
        </p>

        <div className="flex justify-center space-x-4">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="text-lg font-bold text-gray-800">{step.duration}</div>
              <div className="text-sm text-gray-600">{step.name}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white/80 rounded-xl p-4 border border-white">
        <p className="text-gray-700 text-sm">
          <span className="font-semibold">练习方法：</span>按照 4-7-8 节奏呼吸，每天练习几次有助于缓解焦虑。
        </p>
      </div>
    </div>
  )
}