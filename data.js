var index = {'G':0, 'MP':2, 'FG':3, 'FGA':4, '3P':6, '3PA':7, 'FT':10, 'FTA':11, 'OREB':13, 'DREB':14, 'REB':15, 'AST':16, 'STL':17, 'BLK':18, 'TOV':19, "PF":20, 'PTS':21 };
console.log(NaN < 1)
function singleSeasonStat(player_name,g, PTS, REB, AST, STL, BLK, _3P, OREB, DREB, FG, FGA, _3PA, TOV, PF, MP, season )
{
    this.name = player_name;
    this.PTS = PTS;
    this.REB = REB;
    this.AST = AST;
    this.STL = STL;
    this.BLK = BLK;
    this["3P"] = _3P;
    this.G = g;
    this.OREB = OREB;
    this.DREB = DREB;
    this.FG = FG;
    this.FGA = FGA;
    this['FG%'] = (!isNaN(this.FG) && !isNaN(this.FGA)) ? this.FG/this.FGA : NaN;
    this['3PA'] = _3PA;
    this['3P%'] = (!isNaN(this['3P']) && !isNaN(this['3PA'])) ? this['3P']/this['3PA'] : NaN;
    this['eFG%'] = (!isNaN(this.FG) && !isNaN(this.FGA)) ? this.FG : NaN;

    if(!isNaN(this['eFG%'])){
        this['eFG%'] = (!isNaN(this['3P'])) ? (this.FG + 0.5*this['3P'])/this.FGA : this.FG/this.FGA;
    }
    
    this.TOV = TOV;
    this.PF = PF;
    this.MP = MP;
    this.season = season;

    var me = this;
    this.sum = function(g, pts, reb, ast, stl, blk, _3p, OREB, DREB, FG, FGA, _3PA, TOV, PF, MP)
    {
        if(!isNaN(pts))
            me.PTS = (isNaN(me.PTS)) ? pts : me.PTS + pts;

        if(!isNaN(reb)){
            me.REB = (isNaN(me.REB)) ? reb :me.REB + reb;
        }

        if(! isNaN(ast))
            me.AST = (isNaN(me.AST)) ? ast:me.AST + ast;

        if(! isNaN(stl))
            me.STL = (isNaN(me.STL)) ? stl:me.STL + stl;

        if(! isNaN(blk))
            me.BLK = (isNaN(me.BLK)) ? blk:me.BLK + blk;

        if(! isNaN(_3p))
            me['3P'] = (isNaN(me['3P'])) ? _3p : me['3P'] + _3p;

        if(! isNaN(OREB))
            me.OREB = (isNaN(me.OREB)) ? OREB: me.OREB + OREB;

        if(! isNaN(DREB))
            me.DREB = (isNaN(me.DREB)) ? DREB:me.DREB + DREB;

        if(! isNaN(FG))
            me.FG = (isNaN(me.FG)) ? FG:me.FG + FG;

        if(! isNaN(FGA))
            me.FGA = (isNaN(me.FGA)) ? FGA:me.FGA + FGA;

        if(! isNaN(_3PA))
            me["3PA"] = (isNaN(me["3PA"])) ? _3PA:me["3PA"] + _3PA;

        if(! isNaN(TOV))
            me.TOV = (isNaN(me.TOV)) ? TOV:me.TOV + TOV;

        if(! isNaN(PF))
            me.PF = (isNaN(me.PF)) ? PF:me.PF + PF;

        if(! isNaN(MP))
            me.MP = (isNaN(me.MP)) ? MP:me.MP + MP;

        this['FG%'] = (!isNaN(this.FG) && !isNaN(this.FGA)) ? this.FG/this.FGA : NaN;
        this['3P%'] = (!isNaN(this['3P']) && !isNaN(this['3PA'])) ? this['3P']/this['3PA'] : NaN;
        this['eFG%'] = (!isNaN(this.FG) && !isNaN(this.FGA)) ? this.FG : NaN;

        if(!isNaN(this['eFG%'])){
            this['eFG%'] = (!isNaN(this['3P'])) ? (this.FG + 0.5*this['3P'])/this.FGA : this.FG/this.FGA;
        }
    }
}


function logo(){
    document.getElementById("logo").innerHTML = document.body.clientWidth;
}

function showInCategoria(stats, stat, totals)
{
    var statsToShow = stats.sort(function(a, b)
        {
            if(isNaN(a[stat]))
                return 1;

            if(isNaN(b[stat]))
                return -1;

            var ag = a.G;
            var bg = b.G;

            if (totals)
            {
                ag = 1;
                bg = 1;
            }
            if (a[stat]/ag > b[stat]/bg){
                return -1;
            }

            if(a[stat]/ag < b[stat]/bg)
                return 1;

            return 0;
        }).slice(0, 8);

        return statsToShow;
}

function parseSeasonStats(seasonStats, season, stats)
{
    if(!stats)
      stats = []
    Object.keys(seasonStats).forEach(playerID =>
        {
            var playerStats = seasonStats[playerID]
            var name = playerStats['name']
            var team = '';
            if(playerStats['TOT'])
            {
                team = 'TOT'
            }
            else
            {
                team = Object.keys(playerStats)[1];
            }

            var pts = parseFloat(playerStats[team][21]);
            var g = parseFloat(playerStats[team][0]);
            var reb = parseFloat(playerStats[team][index['REB']]);
            var ast = parseFloat(playerStats[team][index['AST']]);
            var stl = parseFloat(playerStats[team][index['STL']]);
            var blk = parseFloat(playerStats[team][index['BLK']]);
            var _3p = parseFloat(playerStats[team][index['3P']]);
            var fg = parseFloat(playerStats[team][index['FG']]);
            var fga = parseFloat(playerStats[team][index['FGA']]);
            var _3pa = parseFloat(playerStats[team][index['3PA']]);
            var ft = parseFloat(playerStats[team][index['FT']]);
            var fta = parseFloat(playerStats[team][index['FTA']]);
            var mp = parseFloat(playerStats[team][index['MP']]);
            var tov = parseFloat(playerStats[team][index['TOV']]);
            var oreb = parseFloat(playerStats[team][index['OREB']]);
            var dreb = parseFloat(playerStats[team][index['DREB']]);
            var pf = parseFloat(playerStats[team][index['PF']]);

            stats.push(new singleSeasonStat(name,g, pts, reb, ast, stl, blk, _3p, oreb, dreb, fg, fga, _3pa, tov, pf, mp, season))
        });

    return stats;
}

function parseHistoricStats(data)
{
    var stats = {};
    Object.keys(data).forEach ( season =>
        {
            var s = data[season];
            Object.keys(s).forEach(playerID =>
                {
                    var playerStats = s[playerID]
                    var name = playerStats['name']
                    var team = '';
                    if(playerStats['TOT'])
                    {
                        team = 'TOT'
                    }
                    else
                    {
                        team = Object.keys(playerStats)[1];
                    }

                var pts = parseFloat(playerStats[team][21]);
                var g = parseFloat(playerStats[team][0]);
                var reb = parseFloat(playerStats[team][index['REB']]);
                var ast = parseFloat(playerStats[team][index['AST']]);
                var stl = parseFloat(playerStats[team][index['STL']]);
                var blk = parseFloat(playerStats[team][index['BLK']]);
                var _3p = parseFloat(playerStats[team][index['3P']]);
                var fg = parseFloat(playerStats[team][index['FG']]);
                var fga = parseFloat(playerStats[team][index['FGA']]);
                var _3pa = parseFloat(playerStats[team][index['3PA']]);
                var ft = parseFloat(playerStats[team][index['FT']]);
                var fta = parseFloat(playerStats[team][index['FTA']]);
                var mp = parseFloat(playerStats[team][index['MP']]);
                var tov = parseFloat(playerStats[team][index['TOV']]);
                var oreb = parseFloat(playerStats[team][index['OREB']]);
                var dreb = parseFloat(playerStats[team][index['DREB']]);
                var pf = parseFloat(playerStats[team][index['PF']]);

                    if(stats[playerID]){
                        stats[playerID].sum(g, pts, reb, ast, stl, blk, _3p, oreb, dreb, fg, fga, _3pa, tov, pf, mp)
                    }

                    else{
                        stats[playerID] = new singleSeasonStat(name,g, pts, reb, ast, stl, blk, _3p, oreb, dreb, fg, fga, _3pa, tov, pf, mp, 1);
                    }

                });
        }
        );
        return stats;
}

function showSeasonLeaders()
{
    season = '2021';
    var seasonStats = data[season];
    var stats = parseSeasonStats(seasonStats);

    var content = document.getElementsByClassName("leader");

    for(var i = 0; i < content.length; i++)
    {
        var statsToShow = showInCategoria(stats, content[i].id)
        var content_leader = content[i].getElementsByClassName("content-leader");
        for(var j = 0; j < content_leader.length; j++)
        {
            var children = content_leader[j].childNodes;
            children[3].innerHTML = statsToShow[j].name;
            children[5].innerHTML = (statsToShow[j][content[i].id]/statsToShow[j].G).toFixed(1);
        }
    }

}

function showHistoricStats()
{
    var stats = parseHistoricStats(data);
    console.log(Object.values(stats));
    var content = document.getElementsByClassName("leader");
    for(var i = 0; i < content.length; i++)
    {
        var statsToShow = showInCategoria(Object.values(stats), content[i].id, true);
        var content_leader = content[i].getElementsByClassName("content-leader");
        for(var j = 0; j < content_leader.length; j++)
        {
            var children = content_leader[j].childNodes;
            children[3].innerHTML = statsToShow[j].name;
            children[5].innerHTML = Math.round((statsToShow[j][content[i].id]));
        }
    }
}

window.onresize = logo;