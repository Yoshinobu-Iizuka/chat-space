# README

## menbersテーブル
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
|message_id|integer|null: false, foreign_key: true|
|menber_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|timestamp|datetime|null: false|

### Association
- has_many :menbers
- has_many :groups, through: :menbers
- has_many :messages

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|title|string|index: true,null: false|
|message|text|null: false|
|image|text|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|timestamp|datetime|null: false|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|name|string|index: true, null: false|
|message_id|integer|null: false, foreidn_key: ture|
|user_id|integer|null: false, foreidn_key: ture|
|menber_id|integer|null: false, foreidn_key: ture|

### Association
- hasmany_to :messages
- hasmany_to :menbers
- hasmeny_to :users, through: :menbers


This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
