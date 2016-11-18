所有圈子
http://qq.100bt.com/AjaxShowAllTTQInfo.action
所有block和每个圈子的info
http://qq.100bt.com/ShowTtqCategory.action?ttqId=132
所有block
http://qq.100bt.com/ShowBlock.action?ttqId=132
某个block下的topicInfo（没有置顶）
http://qq.100bt.com/AjaxCacheTopicInfo.action?blockId=111
某些topic的info
http://qq.100bt.com/AjaxTopicInfos.action?topicIdList=10134803
某个topic的评论列表
http://qq.100bt.com/showCommonCommentAjax.action?topicId=10134803

参数名	参数类型	必传	缺省值	描述
topicId	int	N		话题id，与id 其一必选
id	int	N		业务Id，与topicId其一必选
type	int	Y		评论类型，圈圈话题时取0
commentListSortType	int	N	1	排序类型1，按时间，3按献花
pager.offset	int	Y		分页
pager.limit	int	Y		分页
fillTTQUserInfo	bool	N	false	是否填充用户


http://qq.100bt.com/submitCommonComment.action
参数名	参数类型	必传	缺省值	描述
topicId	int	N	0	要回复的话题ID，没有id和type时，必须的
id	int	N	0	其它业务ID，如果没有topicId时，是必须
type	int	N	0	其它业务类型，如果没有topicId时，是必须。type为1时，表示官网文章
content	string	Y		回复内容
quotedCommentId	int	N	0	被回复评论的id，主要用于系统消息定位
quotedCommentContent	string	N		被回复的评论内容，主要用于发消息显示
quotedCommentUId	int	N		被回复的用户id，主要用于发系统消息
quotedCommentUName	int	N		被回复的用户名，主要用于发消息显示用户名

http://qq.100bt.com/AjaxSearchTopic.action?kw=sdf


http://qq.100bt.com/JoinToCategory.action&ttqId=13

http://qq.100bt.com/ShowUserInfo.action?userIdArray=1001


http://my.100bt.com/friend/showFriends.json

参数名	参数类型	必传	缺省值	描述
relate	string	N	friend	关系类型：friend，following，follower
groupId	int	N		好友分组Id
kw	string	N		搜索关键字
offset	int	N	0
limit	int	N	20
showGroupInfo	bool	N	false	是否显示分组信息


http://my.100bt.com/ShowFriends.action
用户关注的好友列表（用户关注的就有）