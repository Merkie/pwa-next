interface DashboardNavigationProps {
  activeDashboardPage: string;
  setActiveDashboardPage: (activeDashboardPage: string) => void;
}

function DashboardNavigation({
  activeDashboardPage,
  setActiveDashboardPage,
}: DashboardNavigationProps) {
  const options = [
    {
      name: "profile",
      icon: "user",
    },
    {
      name: "settings",
      icon: "cog",
    },
    {
      name: "community",
      icon: "group",
    },
  ];

  return (
    <div className="bg-gray-800 border border-gray-600 border-y-0 border-l-0">
      <a href="/">
        <div className="bg-gradient-to-r p-4 font-bold text-xl text-center from-blue-800 to-blue-500">
          <span className="inline sm:hidden">FS</span>
          <span className="hidden sm:inline">FreeSpeech</span>
        </div>
      </a>
      {options.map((option) => {
        return (
          <button
            className={`flex capitalize items-center justify-center w-full gap-2 p-4 text-xl border border-x-0 ${
              activeDashboardPage === option.name
                ? "bg-gray-700 border-gray-600"
                : "hover:bg-gray-700 border-gray-800"
            }`}
            onClick={() => setActiveDashboardPage(option.name)}
            key={option.name}
          >
            <i
              className={`bx bx${
                activeDashboardPage === option.name ? "s" : ""
              }-${option.icon}`}
            />{" "}
            <span className="hidden sm:inline">{option.name}</span>
          </button>
        );
      })}
    </div>
  );
}

export default DashboardNavigation;
