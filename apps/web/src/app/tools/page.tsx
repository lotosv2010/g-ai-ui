import { PlaygroundFrame } from '../../components/PlaygroundFrame'
import { ToolsLab } from '../../components/ToolsLab'

export default function ToolsPage() {
  return (
    <PlaygroundFrame
      activeRoute="tools"
      title="工具测试"
      description="使用独立路由验证 @g-ai-ui/utils 的输入规范化、上下文处理和模型参数合并逻辑。"
    >
      <ToolsLab />
    </PlaygroundFrame>
  )
}
