---
title: git命令合集  
date: 2019-05-15
tags:
- git
author: 尘丶骁
---
## 常用命令
|命令|目的|
| -----------------------|:--------:|
|`git reset --mixed a06e2f` |		将已经commit的提交撤销到工作区       |
 |`git reset --soft a06e2f` |           将已经commit的提交撤销到暂存区|
 |`git reset --hard a06e2f` |        回滚到某一版本(具有破坏性)|
 |`git clone --recursive`  |           循环克隆子项目|
 |`git submodule foreach git pull origin dev`|  更新所有子模块|
 |`git remote set-url origin https://xxx.xx.com/xxx/xxx.git` | 设置远程分支|
 |`git branch (--set-upstream-to | --track) origin/remote local branch`| 本地分支与远程关联|
 |`git branch –set-upstream 本地新建分支名 origin/远程分支名`|新建本本地分支并与远程关联|
 |`git remote -v` | 查看远程分支
 |`git config --global branch.autosetuprebase always` |  全局设置rebase|
 |`git push --set-upstream origin xxx:xxx` |  推送本地分支到远程|
 |`git branch -m oldname newname`  |   修改分支名|
 |`git rebase -i ` |   合并commit|
 |`git checkout -t origin/分支名 ` |   创建远程同名分支并关联|
 |ssh-keygen -t rsa -C lidewang@ky-tech.com.cn|生成秘钥|

