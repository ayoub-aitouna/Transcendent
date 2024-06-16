# when player wins, game or tournament this manager get notified and update the user achievements and xp and rank accordingly
from game.models import Matchup, Tournament
from user.models import User, Achievements, Ranks


class AchievementsManager:
    def __init__(self, user):
        pass

    def handleWinStreak(self, user: User) -> None:
        win_streak = 0
        last_match_ups = Matchup.objects.filter(
            Winner=user).order_by('-created_at')

        win_strike_achievements = Achievements.objects.filter(
            requirement_type='win_streak')
        if not win_strike_achievements.exists():
            return
        obtained_achievement: Achievements = user.achievements.filter(
            requirement_type='win_streak').order_by('-created_at').first()
        if obtained_achievement:
            last_match_ups = last_match_ups.filter(
                created_at__gte=obtained_achievement.created_at)
        for matchUp in last_match_ups:
            if matchUp.Winner is not user:
                break
            win_streak += 1

        for achievement in win_strike_achievements:
            if win_streak >= achievement.requirement_value:
                user.achievements.add(achievement)

    def handleTotalPoints(self, user: User) -> None:
        total_point_achievements = Achievements.objects.filter(
            requirement_type='total_points')
        if not total_point_achievements.exists():
            return
        for achievement in total_point_achievements:
            if user.total_xp >= achievement.requirement_value:
                user.achievements.add(achievement)

    def handleZeroLoss(self, user: User) -> None:
        pass

    def handleTotalWins(self, user: User) -> None:
        pass

    def getNextRank(current_rank_order):
        try:
            return Ranks.objects.get(hierarchy_order=current_rank_order + 1)
        except Ranks.DoesNotExist:
            return None

    @staticmethod
    def handleUserAchievements(user: User, tournament: Tournament, match_up: Matchup):
        user.current_xp += 120
        user.total_xp += 120
        required_xp = user.rank.xp_required
        next_rank = AchievementsManager.getNextRank(user.rank.hierarchy_order)
        if user.current_xp >= required_xp and next_rank is not None:
            user.current_xp -= required_xp
            user.rank = next_rank
        user.save()
        AchievementsManager.handleWinStreak(user)
        AchievementsManager.handleTotalPoints(user)
        AchievementsManager.handleZeroLoss(user)
        AchievementsManager.handleTotalWins(user)
        return
