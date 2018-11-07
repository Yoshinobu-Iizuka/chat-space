# README

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## usersテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true,null: false|
|email|string|null: false foreign_key: true|
|password|string|null: false|


### Association
- has_many :members
- has_many :groups, through: :members
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|index: true,null: false|
|message|text|null: false|
|image|text|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|


### Association
- hasmany_to :messages
- hasmany_to :members
- hasmany_to :users, through: :members
