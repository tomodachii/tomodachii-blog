+++
title = '{{ replace .File.ContentBaseName "-" " " | title }}'
date = {{ .Date }}
draft = true
description = ""
image = ""
imageBig = ""
categories = ["general"]
authors = ["Tomodachii"]
avatar = "/images/avatar.png"
math = false
section = "Random"
weight = 0
postColor = "{{ index (shuffle (index .Site.Data.postColors "postColors")) 0 }}"
+++
