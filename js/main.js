// ==========================================
// 滴灌通投资决策平台 - 全局数据管理
// ==========================================

// 全局数据存储 - 用于数据前后勾稽
const globalData = {
    project: {},
    calculator: {},
    screening: {},
    contract: {}
};

// ==========================================
// 投资报告生成
// ==========================================

function generateReport() {
    // 收集表单数据
    const data = {
        projectName: document.getElementById('projectName').value,
        companyName: document.getElementById('companyName').value,
        location: document.getElementById('location').value,
        area: parseFloat(document.getElementById('area').value),
        brandCount: parseInt(document.getElementById('brandCount').value),
        investment: parseFloat(document.getElementById('reportInvestment').value),
        annualRate: parseFloat(document.getElementById('reportAnnualRate').value),
        shareRatio: parseFloat(document.getElementById('reportShareRatio').value),
        monthlyGrossProfit: parseFloat(document.getElementById('monthlyGrossProfit').value)
    };
    
    // 验证必填字段
    if (!data.projectName || !data.companyName || !data.investment) {
        alert('请填写必要的信息');
        return;
    }
    
    // 保存到全局数据
    globalData.project = data;
    
    // 自动填充其他表单
    autoFillForms(data);
    
    // 计算关键指标
    const monthlyRevenue = data.monthlyGrossProfit / (70/100); // 假设70%毛利率
    const monthlyShare = monthlyRevenue * (data.shareRatio / 100);
    const cappedAmount = data.investment * (1 + data.annualRate / 100);
    const paybackMonths = Math.ceil(cappedAmount / monthlyShare);
    const duration = 18; // 联营期限
    const totalReturn = monthlyShare * duration;
    const expectedProfit = totalReturn - data.investment;
    
    // 生成报告内容
    const reportHTML = `
        <h3 class="report-section-title">一、项目概况</h3>
        <div class="report-content">
            <strong>项目名称：</strong>${data.projectName}<br>
            <strong>运营企业：</strong>${data.companyName}<br>
            <strong>项目点位：</strong>${data.location}<br>
            <strong>项目面积：</strong>${data.area}平方米<br>
            <strong>品牌数量：</strong>${data.brandCount}个<br>
        </div>
        
        <h3 class="report-section-title">二、投资方案</h3>
        <table class="report-table">
            <tr>
                <th>项目</th>
                <th>数值</th>
            </tr>
            <tr>
                <td>投资金额</td>
                <td class="text-gold">${data.investment}万元</td>
            </tr>
            <tr>
                <td>年化收益率</td>
                <td class="text-gold">${data.annualRate}%</td>
            </tr>
            <tr>
                <td>分成比例</td>
                <td class="text-gold">${data.shareRatio}%</td>
            </tr>
            <tr>
                <td>联营期限</td>
                <td class="text-gold">${duration}个月</td>
            </tr>
        </table>
        
        <h3 class="report-section-title">三、收益预测</h3>
        <table class="report-table">
            <tr>
                <th>指标</th>
                <th>数值</th>
            </tr>
            <tr>
                <td>月毛利</td>
                <td class="text-gold">${data.monthlyGrossProfit.toFixed(2)}万元</td>
            </tr>
            <tr>
                <td>预计月营业额</td>
                <td class="text-gold">${monthlyRevenue.toFixed(2)}万元</td>
            </tr>
            <tr>
                <td>月均分成收入</td>
                <td class="text-gold">${monthlyShare.toFixed(2)}万元</td>
            </tr>
            <tr>
                <td>回本周期</td>
                <td class="text-gold">${paybackMonths}个月</td>
            </tr>
            <tr>
                <td>联营期总收益</td>
                <td class="text-gold">${totalReturn.toFixed(2)}万元</td>
            </tr>
            <tr>
                <td>预期利润</td>
                <td class="text-gold">${expectedProfit.toFixed(2)}万元</td>
            </tr>
            <tr>
                <td>投资回报率</td>
                <td class="text-gold">${((expectedProfit / data.investment) * 100).toFixed(2)}%</td>
            </tr>
        </table>
        
        <h3 class="report-section-title">四、商业模式分析（3L+C）</h3>
        <div class="report-content">
            <strong>Labor（专业团队）：</strong>${data.companyName}拥有专业的商业运营团队，具备丰富的品牌管理和点位运营经验。<br><br>
            <strong>Land（优质点位）：</strong>项目位于${data.location}，属于高流量、高势能的核心商业点位，客流量稳定且消费力强。<br><br>
            <strong>Leverage（品牌资源）：</strong>项目整合${data.brandCount}个优质品牌，形成多元化业态组合，增强抗风险能力。<br><br>
            <strong>Capital（资金支持）：</strong>滴灌通提供${data.investment}万元投资支持，采用RBF（收入分成）模式，与运营方利益共享、风险共担。<br>
        </div>
        
        <h3 class="report-section-title">五、风险控制</h3>
        <div class="report-content">
            <strong>1. 招商风险：</strong>项目已完成${data.brandCount}个品牌的招商，满租率达100%，降低空置风险。<br><br>
            <strong>2. 收入保障：</strong>月毛利${data.monthlyGrossProfit}万元，毛利率70%，收入来源稳定。<br><br>
            <strong>3. 履约保障：</strong>${data.companyName}历史履约记录良好，具备完善的数据报送和分成支付机制。<br><br>
            <strong>4. 退出机制：</strong>联营期${duration}个月，到期后可选择续约或退出，灵活性强。<br>
        </div>
        
        <h3 class="report-section-title">六、投资建议</h3>
        <div class="report-content">
            基于以上分析，<strong class="text-gold">${data.projectName}</strong>具备以下优势：<br><br>
            ✓ 优质点位资源，客流量保障<br>
            ✓ 多品牌组合，抗风险能力强<br>
            ✓ 收入分成模式，利益绑定紧密<br>
            ✓ 回本周期${paybackMonths}个月，投资回报率${((expectedProfit / data.investment) * 100).toFixed(2)}%<br><br>
            <strong class="text-gold">综合评估：强烈推荐投资</strong>
        </div>
    `;
    
    // 显示报告
    document.getElementById('reportContent').innerHTML = reportHTML;
    document.getElementById('reportDate').textContent = new Date().toLocaleDateString('zh-CN');
    document.getElementById('reportOutput').classList.remove('hidden');
    
    // 滚动到报告
    document.getElementById('reportOutput').scrollIntoView({ behavior: 'smooth' });
}

function exportReport() {
    const reportOutput = document.getElementById('reportOutput');
    if (reportOutput.classList.contains('hidden')) {
        alert('请先生成报告');
        return;
    }
    
    // 创建打印窗口
    const printWindow = window.open('', '_blank');
    const reportContent = reportOutput.innerHTML;
    
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>投资分析报告</title>
            <style>
                body { 
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                    padding: 2rem;
                    background: white;
                    color: #000;
                }
                h3 { 
                    color: #d4af37;
                    margin-top: 2rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 2px solid #d4af37;
                }
                table { 
                    width: 100%;
                    border-collapse: collapse;
                    margin: 1rem 0;
                }
                th, td { 
                    padding: 0.75rem;
                    text-align: left;
                    border: 1px solid #ddd;
                }
                th { 
                    background: #f5f5f5;
                    font-weight: 600;
                }
                .text-gold { color: #d4af37; }
                .report-header {
                    text-align: center;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 3px solid #d4af37;
                }
                .report-logo {
                    font-size: 2rem;
                    font-weight: 700;
                    color: #d4af37;
                }
            </style>
        </head>
        <body>
            ${reportContent}
        </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

function resetReport() {
    document.getElementById('reportForm').reset();
    document.getElementById('reportOutput').classList.add('hidden');
}

// ==========================================
// 投资回报计算器
// ==========================================

function calculateROI() {
    const investAmount = parseFloat(document.getElementById('investAmount').value);
    const annualRate = parseFloat(document.getElementById('annualRate').value);
    const shareRatio = parseFloat(document.getElementById('shareRatio').value);
    const monthlyRevenue = parseFloat(document.getElementById('monthlyRevenue').value);
    const duration = parseInt(document.getElementById('duration').value);
    
    if (!investAmount || !monthlyRevenue) {
        alert('请填写必要的信息');
        return;
    }
    
    // 保存到全局数据
    globalData.calculator = { investAmount, annualRate, shareRatio, monthlyRevenue, duration };
    
    // 计算
    const monthlyShare = monthlyRevenue * (shareRatio / 100);
    const cappedAmount = investAmount * (1 + annualRate / 100);
    const paybackMonths = Math.ceil(cappedAmount / monthlyShare);
    const totalReturn = monthlyShare * duration;
    const expectedProfit = totalReturn - investAmount;
    
    // 显示结果
    document.getElementById('paybackMonths').textContent = `${paybackMonths}月`;
    document.getElementById('totalReturn').textContent = totalReturn.toFixed(2);
    document.getElementById('expectedProfit').textContent = expectedProfit.toFixed(2);
    document.getElementById('monthlyShare').textContent = monthlyShare.toFixed(2);
    
    document.getElementById('calculatorResults').classList.remove('hidden');
    document.getElementById('calculatorResults').scrollIntoView({ behavior: 'smooth' });
}

function resetCalculator() {
    document.getElementById('calculatorForm').reset();
    document.getElementById('calculatorResults').classList.add('hidden');
}

// ==========================================
// 企业筛选评估
// ==========================================

function calculateScore() {
    const enterpriseName = document.getElementById('enterpriseName').value;
    if (!enterpriseName) {
        alert('请输入企业名称');
        return;
    }
    
    // 收集评分
    let totalScore = 0;
    for (let i = 1; i <= 8; i++) {
        totalScore += parseInt(document.getElementById(`criteria${i}`).value);
    }
    
    // 保存到全局数据
    globalData.screening = { enterpriseName, totalScore };
    
    // 确定评级和建议
    let rating, ratingClass, recommendation, riskControl;
    
    if (totalScore >= 185) {
        rating = '优秀';
        ratingClass = 'excellent';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-gold">${totalScore}分</strong>，属于<strong class="text-gold">优秀级别</strong>。<br><br>
            <strong>投资建议：强烈推荐投资</strong><br>
            建议投资规模：400-600万元<br>
            建议年化收益：18%<br>
            建议分成比例：35%<br>
            联营期限：18个月`;
        riskControl = `${enterpriseName}具备优质点位获取能力，历史履约记录良好，AI技术应用成熟，品牌资源丰富。建议重点关注：1）招商进度按时完成；2）每月数据及时报送；3）分成款项准时支付。`;
    } else if (totalScore >= 155) {
        rating = '良好';
        ratingClass = 'good';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-gold">${totalScore}分</strong>，属于<strong class="text-gold">良好级别</strong>。<br><br>
            <strong>投资建议：可以投资</strong><br>
            建议投资规模：200-400万元<br>
            建议年化收益：16-18%<br>
            建议分成比例：40%<br>
            联营期限：12-15个月`;
        riskControl = `${enterpriseName}整体能力较强，但仍有提升空间。建议重点关注：1）点位资源质量；2）品牌招商能力；3）运营数据真实性；4）团队稳定性。建议增加月度运营审核频次。`;
    } else if (totalScore >= 125) {
        rating = '一般';
        ratingClass = 'fair';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-gold">${totalScore}分</strong>，属于<strong class="text-gold">一般级别</strong>。<br><br>
            <strong>投资建议：谨慎投资</strong><br>
            建议投资规模：100-200万元<br>
            建议年化收益：14-16%<br>
            建议分成比例：50%<br>
            联营期限：6-12个月`;
        riskControl = `${enterpriseName}存在较多不确定因素。建议重点关注：1）点位资源是否稳定；2）品牌招商是否达标；3）收入是否达到预期；4）履约能力是否可靠。建议设置更严格的退出条款和风控措施。`;
    } else {
        rating = '不推荐';
        ratingClass = 'poor';
        recommendation = `<strong>${enterpriseName}</strong>综合评分<strong class="text-gold">${totalScore}分</strong>，低于投资标准。<br><br>
            <strong>投资建议：不建议投资</strong><br>
            综合能力不足，风险较高，建议观望或要求企业提升能力后再评估。`;
        riskControl = `${enterpriseName}综合能力较弱，不符合当前投资标准。主要风险：点位资源质量差、运营能力不足、品牌资源匮乏、团队经验不足。建议暂不投资，待企业提升能力后再行评估。`;
    }
    
    // 显示结果
    document.getElementById('totalScore').textContent = totalScore;
    document.getElementById('scoreRating').textContent = rating;
    document.getElementById('scoreRating').className = `score-rating ${ratingClass}`;
    document.getElementById('scoreRecommendation').innerHTML = recommendation;
    document.getElementById('riskControl').innerHTML = riskControl;
    
    document.getElementById('screeningResults').classList.remove('hidden');
    document.getElementById('screeningResults').scrollIntoView({ behavior: 'smooth' });
}

function resetScreening() {
    document.getElementById('screeningForm').reset();
    document.getElementById('screeningResults').classList.add('hidden');
}

// ==========================================
// 投资合同生成
// ==========================================

function generateContract() {
    const partyA = document.getElementById('partyA').value || '滴灌通投资（海南）有限公司';
    const partyB = document.getElementById('partyB').value;
    const location = document.getElementById('contractLocation').value;
    const investment = parseFloat(document.getElementById('contractInvestment').value);
    const annualRate = parseFloat(document.getElementById('contractAnnualRate').value);
    const shareRatio = parseFloat(document.getElementById('contractShareRatio').value);
    const duration = parseInt(document.getElementById('contractDuration').value);
    
    if (!partyB || !location || !investment) {
        alert('请填写必要的信息');
        return;
    }
    
    // 保存到全局数据
    globalData.contract = { partyA, partyB, location, investment, annualRate, shareRatio, duration };
    
    // 计算关键数据
    const cappedAmount = investment * (1 + annualRate / 100);
    const dailyRate = (annualRate / 365).toFixed(4);
    
    // 生成合同
    const contractHTML = `
<strong>联营投资协议</strong>

甲方（投资方）：${partyA}
乙方（运营方）：${partyB}

根据《中华人民共和国合同法》等相关法律法规，甲乙双方在平等、自愿、公平、诚实信用的基础上，就甲方投资乙方运营项目事宜，达成如下协议：

<h3>第一条 投资概况</h3>

1.1 <strong>项目点位：</strong>${location}

1.2 <strong>投资金额：</strong>人民币${investment}万元整

1.3 <strong>年化收益率：</strong>${annualRate}%

1.4 <strong>分成比例：</strong>甲方获得项目营业额的${shareRatio}%作为投资回报

1.5 <strong>联营期限：</strong>${duration}个月

<h3>第二条 投资方式与资金使用</h3>

2.1 甲方以现金方式向乙方投资，用于项目的装修、设备采购、品牌加盟费等相关费用。

2.2 乙方应合理使用投资款项，不得挪作他用。

2.3 乙方应向甲方提供资金使用明细和相关凭证。

<h3>第三条 收益分配</h3>

3.1 分成计算：甲方每月获得项目营业额（以实际到账为准）的${shareRatio}%作为投资回报。

3.2 封顶机制：甲方累计分成达到${cappedAmount}万元（投资本金×${1 + annualRate/100}）时，投资关系终止。

3.3 日平息计算：按日平息${dailyRate}%计算，确保年化收益率${annualRate}%。

3.4 支付时间：乙方应于每月1号前将上月分成款项支付至甲方指定账户。

<h3>第四条 数据报送与监督</h3>

4.1 乙方应于每月1号前向甲方报送上月营业数据，包括但不限于：
    - 营业额明细
    - 品牌入驻情况
    - 客流量数据
    - 费用支出情况

4.2 甲方有权要求乙方提供相关凭证（如机场POS小票、银行流水等）以核实数据真实性。

4.3 乙方应配合甲方的实地考察和审计工作。

<h3>第五条 前置条件</h3>

5.1 项目已取得合法经营资质
5.2 租赁合同已签订且有效
5.3 品牌招商完成率不低于80%
5.4 装修方案已获批准
5.5 乙方已提供历史运营数据
5.6 风险缓释措施已落实

<h3>第六条 违约责任</h3>

6.1 乙方未按时支付分成款项的，每逾期一日，应按欠付金额的0.5%向甲方支付违约金。

6.2 乙方提供虚假数据或隐瞒真实经营情况的，甲方有权要求乙方立即返还全部投资本金并支付违约金。

6.3 乙方未经甲方同意擅自转让、转包项目的，视为根本违约，甲方有权解除协议并要求赔偿。

<h3>第七条 退出机制</h3>

7.1 正常退出：联营期满或累计分成达到封顶金额时，投资关系自动终止。

7.2 提前退出：
    - 甲方提前退出：需提前30天书面通知乙方，乙方应返还剩余本金。
    - 乙方提前退出：需提前60天书面通知甲方，并返还全部本金及按比例计算的收益。

7.3 强制退出：乙方出现重大违约、经营不善导致连续3个月无法支付分成等情况，甲方有权要求立即退出并追究违约责任。

<h3>第八条 争议解决</h3>

8.1 本协议履行过程中发生的争议，双方应友好协商解决。

8.2 协商不成的，任何一方均可向甲方所在地人民法院提起诉讼。

<h3>第九条 其他约定</h3>

9.1 本协议自双方签字盖章之日起生效。

9.2 本协议一式两份,甲乙双方各执一份，具有同等法律效力。

9.3 本协议未尽事宜，双方可另行签订补充协议，补充协议与本协议具有同等法律效力。


甲方（盖章）：${partyA}            乙方（盖章）：${partyB}

法定代表人：_______________        法定代表人：_______________

签订日期：_______________          签订日期：_______________
    `;
    
    document.getElementById('contractPreview').innerHTML = contractHTML;
    document.getElementById('contractPreview').classList.remove('hidden');
    document.getElementById('contractPreview').scrollIntoView({ behavior: 'smooth' });
}

function downloadContract() {
    const contractPreview = document.getElementById('contractPreview');
    if (contractPreview.classList.contains('hidden')) {
        alert('请先生成合同');
        return;
    }
    
    const contractText = contractPreview.innerText;
    const blob = new Blob([contractText], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `联营投资协议_${globalData.contract.partyB}_${new Date().toLocaleDateString('zh-CN').replace(/\//g, '-')}.txt`;
    a.click();
    window.URL.revokeObjectURL(url);
}

function resetContract() {
    document.getElementById('contractForm').reset();
    document.getElementById('contractPreview').classList.add('hidden');
}

// ==========================================
// 数据自动填充（勾稽）
// ==========================================

function autoFillForms(projectData) {
    // 自动填充计算器
    if (projectData.investment) {
        document.getElementById('investAmount').value = projectData.investment;
    }
    if (projectData.annualRate) {
        document.getElementById('annualRate').value = projectData.annualRate;
    }
    if (projectData.shareRatio) {
        document.getElementById('shareRatio').value = projectData.shareRatio;
    }
    if (projectData.monthlyGrossProfit) {
        const monthlyRevenue = projectData.monthlyGrossProfit / 0.7;
        document.getElementById('monthlyRevenue').value = monthlyRevenue.toFixed(2);
    }
    
    // 自动填充企业筛选
    if (projectData.companyName) {
        document.getElementById('enterpriseName').value = projectData.companyName;
    }
    
    // 自动填充合同
    if (projectData.companyName) {
        document.getElementById('partyB').value = projectData.companyName;
    }
    if (projectData.location) {
        document.getElementById('contractLocation').value = projectData.location;
    }
    if (projectData.investment) {
        document.getElementById('contractInvestment').value = projectData.investment;
    }
    if (projectData.annualRate) {
        document.getElementById('contractAnnualRate').value = projectData.annualRate;
    }
    if (projectData.shareRatio) {
        document.getElementById('contractShareRatio').value = projectData.shareRatio;
    }
}

// ==========================================
// 页面初始化
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ 滴灌通投资决策平台已完全加载');
    
    // 平滑滚动导航
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // 更新活动状态
                document.querySelectorAll('.nav-menu a').forEach(a => a.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // 滚动时更新导航高亮
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-menu a');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});
