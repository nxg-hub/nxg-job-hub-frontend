import { ChevronRight, FileText, ImageIcon, Film, File } from "lucide-react"
import { cn } from "@/lib/utils"

const FilesSidebar = ({ chatName = "Real estate deals" }) => {
  const fileCategories = [
    {
      id: "documents",
      name: "Documents",
      icon: FileText,
      color: "bg-blue-100",
      textColor: "text-blue-500",
      count: 125,
      size: "193KB",
    },
    {
      id: "photos",
      name: "Photos",
      icon: ImageIcon,
      color: "bg-yellow-100",
      textColor: "text-yellow-500",
      count: 51,
      size: "321MB",
    },
    {
      id: "movies",
      name: "Movies",
      icon: Film,
      color: "bg-green-100",
      textColor: "text-green-500",
      count: 3,
      size: "200MB",
    },
    {
      id: "other",
      name: "Other",
      icon: File,
      color: "bg-red-100",
      textColor: "text-red-500",
      count: 43,
      size: "154MB",
    },
  ]

  // Determine if this is a group chat or individual chat
  const isGroupChat = chatName === "Real estate deals"
  const memberCount = isGroupChat ? 10 : 2

  return (
    <div className="w-72 flex flex-col border-l">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-medium">Shared files</h2>
      </div>

      <div className="p-4">
        <div className="mb-4">
          <h3 className="font-medium mb-2">{chatName}</h3>
          <p className="text-sm text-muted-foreground">{memberCount} members</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold text-teal-500">231</div>
            <div className="text-xs text-muted-foreground">All files</div>
          </div>
          <div className="rounded-lg border p-4 text-center">
            <div className="text-2xl font-bold">45</div>
            <div className="text-xs text-muted-foreground">All links</div>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">File type</h3>
          <button className="text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <circle cx="12" cy="12" r="1"></circle>
              <circle cx="19" cy="12" r="1"></circle>
              <circle cx="5" cy="12" r="1"></circle>
            </svg>
          </button>
        </div>

        <div className="space-y-3">
          {fileCategories.map((category) => (
            <div key={category.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", category.color)}>
                  <category.icon className={cn("h-5 w-5", category.textColor)} />
                </div>
                <div>
                  <div className="font-medium">{category.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {category.count} files, {category.size}
                  </div>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default FilesSidebar
