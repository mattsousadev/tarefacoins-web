import { Badge, For, HStack } from "@chakra-ui/react";

interface TaskTagsProps {
  tags: string[]
  size: "xs" | "sm" | "md" | "lg"
}

const tagColors = ["green", "blue", "purple", "pink", "red", "orange", "yellow", "teal", "cyan", "gray"]

const TaskTags: React.FC<TaskTagsProps> = ({ tags, size }) => {
  return (
    <HStack wrap="wrap">
      <For each={tags}>
        {
          (tag, index) => (
            <Badge key={tag} size={size} colorPalette={tagColors[index]}>
              {tag}
            </Badge>
          )
        }
      </For>
    </HStack>

  );
}

export default TaskTags;