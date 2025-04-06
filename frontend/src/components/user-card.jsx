import AvatarIcon from "./avatar-icom";

const UserCard = ({username}) => {
    function capitalizeEachWord(str) {
        return str
          .split(" ")
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }
    const formattedUsername=capitalizeEachWord(username);
  return (
    <div className="w-full h-20 rounded-md border-2 flex items-center justify-between hover:bg-zinc-100">
      <div className="flex items-center px-5 gap-x-3">
        <AvatarIcon username={username}/>
        <span className="text-xl font-medium">
            {formattedUsername}
        </span>
      </div>
      <SendMoneyBtn/>
    </div>
  )
};

function SendMoneyBtn(){

    return(
        <div className="bg-zinc-800 hover:bg-black cursor-pointer w-32 h-9 rounded-md mx-5 flex items-center justify-center">
            <span className="text-white font-medium ">Send Money</span>
        </div>
    )
}

export default UserCard;