// 模拟数据接口
import Mock from 'mockjs'
import banner from '@/mock/banners'
import floor from '@/mock/floors'

Mock.mock('/mock/banner',{code:200,data:banner})
Mock.mock('/mock/floor',{code:200,data:floor})