export default class ScoreManager {
    constructor() { this.key = "spaceShooterHighScore"; this.rankingKey = "skyStrikerRanking"; this.achievementKey = "skyStrikerAchievements"; }
    getHighScore() { return this.getRanking()[0]?.score || Number(localStorage.getItem(this.key) || 0); }
    getRanking() { try { return JSON.parse(localStorage.getItem(this.rankingKey) || "[]"); } catch { return []; } }
    saveRun({ score, stage, combo, time }) { const entry = { score, stage, combo, time, date: Date.now() }; const records = [...this.getRanking(), entry].sort((a, b) => b.score - a.score || b.stage - a.stage || b.combo - a.combo).slice(0, 10); localStorage.setItem(this.rankingKey, JSON.stringify(records)); localStorage.setItem(this.key, String(records[0]?.score || 0)); return { records, rank: records.findIndex(record => record.date === entry.date) + 1 }; }
    getAchievements() { try { return JSON.parse(localStorage.getItem(this.achievementKey) || "{}"); } catch { return {}; } }
    unlock(id) { const achievements = this.getAchievements(); achievements[id] = true; localStorage.setItem(this.achievementKey, JSON.stringify(achievements)); }
}
