
import { FoodItem, TrafficLight, FoodCategory } from './types';

/**
 * 综合食物数据库 (Bloome Food DB)
 * 包含用户提供的所有详细 FODMAP 分级、分量限制及触发类型。
 */
export const BASE_FOOD_DB: FoodItem[] = [
  // --- 蔬菜 (Vegetables) ---
  { 
    id: 'veg-1', nameZh: '西蓝花', nameEn: 'Broccoli', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=200&h=200&fit=crop',
    reason: '触发因子：果聚糖。注意：安全剂量仅限花朵部分。',
    portions: [
      { label: '低发漫', weight: '75g (花)', light: TrafficLight.GREEN },
      { label: '中发漫', weight: '100g', light: TrafficLight.YELLOW },
      { label: '高发漫', weight: '>150g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-2', nameZh: '胡萝卜', nameEn: 'Carrot', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=200&h=200&fit=crop',
    reason: '无已知发漫触发。',
    portions: [
      { label: '低发漫', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  { 
    id: 'veg-3', nameZh: '黄瓜', nameEn: 'Cucumber', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1449333255529-d4ffca2543ee?w=200&h=200&fit=crop',
    reason: '无已知发漫触发。',
    portions: [
      { label: '低发漫', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  { 
    id: 'veg-4', nameZh: '茄子', nameEn: 'Eggplant', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1628553271447-ed31f409ab6c?w=200&h=200&fit=crop',
    reason: '触发因子：山梨糖醇。',
    portions: [
      { label: '低发漫', weight: '75g', light: TrafficLight.GREEN },
      { label: '中发漫', weight: '180g', light: TrafficLight.YELLOW },
      { label: '高发漫', weight: '>250g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-5', nameZh: '冷冻玉米', nameEn: 'Frozen Corn', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?w=200&h=200&fit=crop',
    reason: '触发因子：山梨糖醇。',
    portions: [
      { label: '低发漫', weight: '1/2 根', light: TrafficLight.GREEN },
      { label: '中发漫', weight: '1 根', light: TrafficLight.YELLOW },
      { label: '高发漫', weight: '>1.5 根', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-6', nameZh: '番茄', nameEn: 'Tomato', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1591189863430-ab87e120f312?w=200&h=200&fit=crop',
    reason: '触发因子：果糖。过量摄入小番茄易导致不适。',
    portions: [
      { label: '低发漫', weight: '1 个', light: TrafficLight.GREEN },
      { label: '高发漫', weight: '大量小番茄', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-7', nameZh: '土豆', nameEn: 'Potato', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f02bad675?w=200&h=200&fit=crop',
    reason: '无已知发漫触发。',
    portions: [
      { label: '低发漫', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  { 
    id: 'veg-8', nameZh: '南瓜', nameEn: 'Pumpkin', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1570586437263-ab629fccc818?w=200&h=200&fit=crop',
    reason: '触发因子：低聚糖。建议食用日本南瓜品种。',
    portions: [
      { label: '低发漫', weight: '75g', light: TrafficLight.GREEN },
      { label: '中发漫', weight: '120g', light: TrafficLight.YELLOW },
      { label: '高发漫', weight: '>150g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-9', nameZh: '红薯', nameEn: 'Sweet Potato', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop',
    reason: '触发因子：甘露醇。',
    portions: [
      { label: '低发漫', weight: '70g', light: TrafficLight.GREEN },
      { label: '中发漫', weight: '100g', light: TrafficLight.YELLOW },
      { label: '高发漫', weight: '>140g', light: TrafficLight.RED }
    ]
  },
  { 
    id: 'veg-10', nameZh: '菠菜', nameEn: 'Spinach', category: FoodCategory.VEGETABLES, 
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop',
    reason: '无已知发漫触发。',
    portions: [
      { label: '低发漫', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'veg-11', nameZh: '大蒜', nameEn: 'Garlic', category: FoodCategory.VEGETABLES,
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=200&h=200&fit=crop',
    reason: '触发因子：高含量果聚糖。极易引发腹胀。',
    portions: [
      { label: '极微量', weight: '3g', light: TrafficLight.YELLOW },
      { label: '高发漫', weight: '>10g', light: TrafficLight.RED }
    ]
  },
  {
    id: 'veg-12', nameZh: '青椒', nameEn: 'Bell Pepper', category: FoodCategory.VEGETABLES,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=200&h=200&fit=crop',
    reason: '低发漫蔬菜，富含维生素C。各种颜色的甜椒均可。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'veg-13', nameZh: '生菜', nameEn: 'Lettuce', category: FoodCategory.VEGETABLES,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=200&h=200&fit=crop',
    reason: '无已知发漫触发，适合做沙拉。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'veg-14', nameZh: '西葫芦', nameEn: 'Zucchini', category: FoodCategory.VEGETABLES,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?w=200&h=200&fit=crop',
    reason: '低发漫蔬菜，适合炒食或烤制。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'veg-15', nameZh: '小白菜', nameEn: 'Bok Choy', category: FoodCategory.VEGETABLES,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1598030085799-34fe8e41bb8c?w=200&h=200&fit=crop',
    reason: '低发漫蔬菜，富含钙和维生素K。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'veg-16', nameZh: '四季豆', nameEn: 'Green Beans', category: FoodCategory.VEGETABLES,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1568584711271-e25f7b4ccd35?w=200&h=200&fit=crop',
    reason: '低发漫蔬菜，富含膳食纤维。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },

  // --- 水果 (Fruits) ---
  {
    id: 'fruit-1', nameZh: '苹果', nameEn: 'Apple', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?w=200&h=200&fit=crop',
    reason: '触发因子：果糖和果聚糖。',
    portions: [
      { label: '少量', weight: '20g', light: TrafficLight.GREEN },
      { label: '中量', weight: '100g', light: TrafficLight.YELLOW },
      { label: '正常', weight: '150g', light: TrafficLight.RED }
    ]
  },
  {
    id: 'fruit-2', nameZh: '香蕉', nameEn: 'Banana', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1571771894821-ad996211fdf4?w=200&h=200&fit=crop',
    reason: '熟透的香蕉含果聚糖较高，建议吃略生的（Green Banana）。',
    portions: [
      { label: '正常', weight: '100g', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'fruit-3', nameZh: '草莓', nameEn: 'Strawberries', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=200&h=200&fit=crop',
    reason: '低发漫水果，富含维生素C和抗氧化剂。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'fruit-4', nameZh: '蓝莓', nameEn: 'Blueberries', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1498557850523-fd3d118b962e?w=200&h=200&fit=crop',
    reason: '低发漫水果，富含花青素。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'fruit-5', nameZh: '橙子', nameEn: 'Orange', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1580052614034-c55d20bfee3b?w=200&h=200&fit=crop',
    reason: '低发漫水果，富含维生素C。建议选择较小的橙子。',
    portions: [
      { label: '1个', weight: '130g', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'fruit-6', nameZh: '葡萄', nameEn: 'Grapes', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1599819177032-c7e2b8b6fcf0?w=200&h=200&fit=crop',
    reason: '低发漫水果，适量食用安全。',
    portions: [
      { label: '正常', weight: '150g', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'fruit-7', nameZh: '奇异果', nameEn: 'Kiwi', category: FoodCategory.FRUITS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1585059895524-72359e06133a?w=200&h=200&fit=crop',
    reason: '低发漫水果，富含维生素C和膳食纤维。',
    portions: [
      { label: '2个', weight: '140g', light: TrafficLight.GREEN }
    ]
  },

  // --- 乳制品 (Dairy) ---
  {
    id: 'dairy-1', nameZh: '全脂牛奶', nameEn: 'Whole Milk', category: FoodCategory.DAIRY_SOY_LACTOSE_FREE,
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1550583724-1255818c053b?w=200&h=200&fit=crop',
    reason: '触发因子：乳糖。建议更换为无乳糖牛奶。',
    portions: [
      { label: '1汤匙', weight: '15g', light: TrafficLight.GREEN },
      { label: '1杯', weight: '250g', light: TrafficLight.RED }
    ]
  },

  // --- 谷物/主食 (Grains) ---
  {
    id: 'grain-1', nameZh: '全麦面包', nameEn: 'Wholemeal Bread', category: FoodCategory.BREAD_CEREALS_RICE_PASTA,
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop',
    reason: '触发因子：果聚糖。建议尝试纯燕麦或无麸质面包。',
    portions: [
      { label: '1片', weight: '24g', light: TrafficLight.YELLOW },
      { label: '2片', weight: '48g', light: TrafficLight.RED }
    ]
  },

  // --- 豆类/豆腐 (Pulses) ---
  {
    id: 'pulse-1', nameZh: '硬豆腐', nameEn: 'Firm Tofu', category: FoodCategory.PULSES_TOFU_NUTS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop',
    reason: '硬豆腐在加工中去除了大部分低聚糖，是非常好的蛋白质来源。',
    portions: [
      { label: '正常', weight: '170g', light: TrafficLight.GREEN }
    ]
  },

  // --- 调味品 (Condiments) ---
  {
    id: 'cond-1', nameZh: '蜂蜜', nameEn: 'Honey', category: FoodCategory.CONDIMENTS,
    baseLight: TrafficLight.RED, personalizedLight: TrafficLight.RED,
    imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop',
    reason: '触发因子：高果糖。',
    portions: [
      { label: '1茶匙', weight: '7g', light: TrafficLight.YELLOW },
      { label: '1汤匙', weight: '21g', light: TrafficLight.RED }
    ]
  },

  // --- 零食 (Snacks) ---
  {
    id: 'snack-1', nameZh: '黑巧克力', nameEn: 'Dark Chocolate', category: FoodCategory.SNACKS_BARS_COOKIES,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1515037893149-de7f840978e2?w=200&h=200&fit=crop',
    reason: '建议选择可可含量 >70% 的品种，避免过多添加糖。',
    portions: [
      { label: '正常', weight: '30g', light: TrafficLight.GREEN },
      { label: '过量', weight: '80g', light: TrafficLight.YELLOW }
    ]
  },

  // --- 肉、鱼、蛋及油脂 (Meat, Fish, Eggs & Oils) ---
  {
    id: 'protein-1', nameZh: '鸡胸肉', nameEn: 'Chicken Breast', category: FoodCategory.MEAT_FISH_EGGS_OILS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=200&h=200&fit=crop',
    reason: '纯蛋白质，无已知发漫触发。是IBS患者的优质蛋白来源。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'protein-2', nameZh: '三文鱼', nameEn: 'Salmon', category: FoodCategory.MEAT_FISH_EGGS_OILS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=200&h=200&fit=crop',
    reason: '富含Omega-3脂肪酸，无已知发漫触发。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'protein-3', nameZh: '鸡蛋', nameEn: 'Eggs', category: FoodCategory.MEAT_FISH_EGGS_OILS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=200&h=200&fit=crop',
    reason: '纯蛋白质和脂肪，无已知发漫触发。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'protein-4', nameZh: '橄榄油', nameEn: 'Olive Oil', category: FoodCategory.MEAT_FISH_EGGS_OILS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop',
    reason: '纯脂肪，无已知发漫触发。建议选择特级初榨橄榄油。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  },
  {
    id: 'protein-5', nameZh: '猪肉', nameEn: 'Pork', category: FoodCategory.MEAT_FISH_EGGS_OILS,
    baseLight: TrafficLight.GREEN, personalizedLight: TrafficLight.GREEN,
    imageUrl: 'https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=200&h=200&fit=crop',
    reason: '纯蛋白质，无已知发漫触发。选择瘦肉部分更佳。',
    portions: [
      { label: '正常', weight: '不限量', light: TrafficLight.GREEN }
    ]
  }
];

export const SYMPTOM_OPTIONS = ['腹胀 (Bloating)', '腹痛 (Pain)', '腹泻 (Diarrhea)', '关节痛 (Joint Pain)', '晨僵 (Stiffness)'];
