import { ComponentsLab } from '../../components/ComponentsLab'
import { PlaygroundFrame } from '../../components/PlaygroundFrame'

export default function ComponentsPage() {
  return (
    <PlaygroundFrame
      activeRoute="components"
      title="组件测试"
      description="使用独立路由验证 @g-ai-ui/ui 的视觉表现、会话交互和状态反馈。"
    >
      <ComponentsLab />
    </PlaygroundFrame>
  )
}
