var index = {'G':0, '_3P':6, 'REB':15, 'AST':16, 'STL':17, 'BLK':18, 'PTS':21 };
console.log(NaN < 1)
function singleSeasonStat(player_name,g, PTS, REB, AST, STL, BLK, _3P)
{
    this.name = player_name;
    this.PTS = PTS;
    this.REB = REB;
    this.AST = AST;
    this.STL = STL;
    this.BLK = BLK;
    this._3P = _3P;
    this.G = g;

    for(var p in Object.keys(index))
    {
        if(isNaN(this[p]))
            this[p] = 0;
    }

    var me = this;
    this.sum = function(g, num_pts, num_reb, num_ast, num_stl, num_blk, num_3p)
    {
        me.PTS += num_pts;
        me.REB += num_reb;
        me.AST += num_ast;
        me.STL += num_stl;
        me.BLK += num_blk;
        me._3P += num_3p;
        me.G += g;
    }
}


function logo(){
    document.getElementById("logo").innerHTML = document.body.clientWidth;
}

function showInCategoria(stats, stat, totals)
{
    var statsToShow = stats.sort(function(a, b)
        {
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

function parseSeasonStats(seasonStats)
{
    var stats = []
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
            var reb = parseFloat(playerStats[team][index['REB']])
            var ast = parseFloat(playerStats[team][index['AST']])
            var stl = parseFloat(playerStats[team][index['STL']])
            var blk = parseFloat(playerStats[team][index['BLK']])
            var _3p = parseFloat(playerStats[team][index['_3P']])
            stats.push(new singleSeasonStat(name,g, pts, reb, ast, stl, blk, _3p))
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
                    var reb = parseFloat(playerStats[team][index['REB']])
                    var ast = parseFloat(playerStats[team][index['AST']])
                    var stl = parseFloat(playerStats[team][index['STL']])
                    var blk = parseFloat(playerStats[team][index['BLK']])
                    var _3p = parseFloat(playerStats[team][index['_3P']])

                    if(isNaN(pts))
                        pts = 0;

                    if(isNaN(g))
                        g = 0;

                    if(isNaN(reb))
                        reb = 0;

                    if(isNaN(ast))
                        ast = 0;

                    if(isNaN(stl))
                        stl = 0;

                    if(isNaN(blk))
                        blk = 0;

                    if(isNaN(_3p))
                        _3p = 0;

                    if(stats[playerID]){
                        stats[playerID].sum(g, pts, reb, ast, stl, blk, _3p)
                    }

                    else{
                        stats[playerID] = new singleSeasonStat(name,g, pts, reb, ast, stl, blk, _3p);
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