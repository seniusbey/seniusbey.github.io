            },
            'drawMiniMap': function() {
                if (i.mapOffsetFixed) {
                    var t = defaultSettings.miniMapWidth;
                    var e = defaultSettings.miniMapTop;
                    var s = t + e;
                    var o = t - 18;
                    var a = e + 9.5;
                    if (this.miniMap) {
                        this.miniMapCtx.clearRect(0, 0, t, s);
                    } else {
                        this.miniMap = document.getElementById("minimap");
                        this.miniMapCtx = this.miniMap.getContext("2d");
                        this.miniMapCtx.ogarioCtx = true;
                        this.miniMap.width = t;
                        this.miniMap.height = s;
                    }
                    if (this.miniMap.width != t) {
                        this.miniMap.width = t;
                        this.miniMap.height = s;
                    }
                    var n = o / i.mapSize;
                    var r = i.mapOffsetX + i.mapOffset;
                    var l = i.mapOffsetY + i.mapOffset;
                    if (this.drawSelectedCell(this.miniMapCtx),
					//
						this.w = i.playerX,
						this.u = i.playerY,
						/*
						this.w = window.legendmod.vector[window.legendmod.vnr][0] ? legendmod.translateX(i.playerX) : i.playerX,
						this.u = window.legendmod.vector[window.legendmod.vnr][1] ? legendmod.translateY(i.playerY) : i.playerY,  
*/						
					//						
                        //this.currentSector = this.calculateMapSector(i.playerX, i.playerY, true),
						this.currentSector = this.calculateMapSector(this.w, this.u, true),
                        this.miniMapCtx.globalAlpha = 1,
                        this.miniMapCtx.font = defaultSettings.miniMapFontWeight + " " + (e - 4) + "px " + defaultSettings.miniMapFontFamily,
                        this.miniMapCtx.fillStyle = defaultSettings.miniMapSectorColor,
                        this.miniMapCtx.fillText(this.currentSector, 10, e),
                    this.miniMapSectors || this.drawMiniMapSectors(defaultSettings.sectorsX, defaultSettings.sectorsY, o, s, a),
                        this.miniMapCtx.save(),
                        this.miniMapCtx.translate(9.5, a), ":battleroyale" === this.gameMode && ogarfooddrawer && ogarfooddrawer.drawBattleAreaOnMinimap(this.miniMapCtx, o, o, n, r, l), 
						defaultmapsettings.showMiniMapGhostCells) {
                        var h = i.ghostCells;
                        this.miniMapCtx.beginPath();
                        var c = 0;
                        for (; c < h.length; c++) {
                            if (!h[c].inView) {
                                var u = ~~((h[c].x + r) * n);
                                var d = ~~((h[c].y + l) * n);
                                this.miniMapCtx.moveTo(u, d);
                                this.miniMapCtx.arc(u, d, ~~(h[c].size * n), 0, this.pi2, false);
                            }
                        }
                        this.miniMapCtx.fillStyle = defaultSettings.miniMapGhostCellsColor;
                        this.miniMapCtx.globalAlpha = defaultSettings.miniMapGhostCellsAlpha;
                        this.miniMapCtx.shadowColor = defaultSettings.miniMapGhostCellsColor;
                        this.miniMapCtx.shadowBlur = 10;
                        this.miniMapCtx.shadowOffsetX = 0;
                        this.miniMapCtx.shadowOffsetY = 0;
                        this.miniMapCtx.fill();
                        this.miniMapCtx.globalAlpha = 1;
                        this.miniMapCtx.shadowBlur = 0;
                    }
                    if (defaultmapsettings.showMiniMapGuides) {
                        u = Math.round((i.playerX + r) * n);
                        d = Math.round((i.playerY + l) * n);
                        this.miniMapCtx.lineWidth = 1;
                        this.miniMapCtx.strokeStyle = defaultSettings.miniMapGuidesColor;
                        this.miniMapCtx.beginPath();
                        this.miniMapCtx.moveTo(u, 0);
                        this.miniMapCtx.lineTo(u, o - 1);
                        this.miniMapCtx.moveTo(0, d);
                        this.miniMapCtx.lineTo(o - 1, d);
                        this.miniMapCtx.stroke();
                    }
                    if (defaultmapsettings.showExtraMiniMapGuides) {
                        u = Math.round((i.playerX + r) * n);
                        d = Math.round((i.playerY + l) * n);

                        //draw the yellow on minimap
                        this.miniMapCtx.beginPath();
                        this.miniMapCtx.lineWidth = "1";
                        this.miniMapCtx.strokeStyle = "yellow";
                        var miniax = legendmod.canvasWidth / (legendmod.mapMaxX - legendmod.mapMinX) / legendmod.viewScale; //CORRECT
                        var miniay = legendmod.canvasHeight / (legendmod.mapMaxY - legendmod.mapMinY) / legendmod.viewScale; //CORRECT
                        var minidaxx = legendmod3.miniMapSectors.width * miniax;
                        var minidayy = legendmod3.miniMapSectors.width * miniay;

                        var fixminidaxx = u - (minidaxx / 2);
                        var fixminidayy = d - (minidayy / 2);

                        //if (fixminidaxx<0){ fixminidaxx=0; }
                        //if (fixminidayy<0){ fixminidayy=0; }
                        this.miniMapCtx.rect(fixminidaxx, fixminidayy, minidaxx, minidayy);
                        this.miniMapCtx.stroke();

                    }
                    if (this.miniMapCtx.beginPath(), 
					this.miniMapCtx.arc((i.playerX + r) * n, (i.playerY + l) * n, 
					defaultSettings.miniMapMyCellSize, 0, this.pi2, false), 
					this.miniMapCtx.closePath(), 
					defaultSettings.miniMapMyCellStrokeSize > 0 && (this.miniMapCtx.lineWidth = defaultSettings.miniMapMyCellStrokeSize, 
					this.miniMapCtx.strokeStyle = defaultSettings.miniMapMyCellStrokeColor, 
					this.miniMapCtx.stroke()), 
					this.miniMapCtx.fillStyle = defaultSettings.miniMapMyCellColor, 
					this.miniMapCtx.fill(), 
					this.teamPlayers.length) {
                        c = 0;
                        for (; c < this.teamPlayers.length; c++) {
                            this.teamPlayers[c].drawPosition(this.miniMapCtx, i.mapOffset, n, this.privateMiniMap, this.targetID, legendmod3.teamPlayers[c].color);
                        }
                    }
                    if (this.deathLocations.length > 0) {
                        u = Math.round((this.deathLocations[this.lastDeath].x + i.mapOffset) * n);
                        d = Math.round((this.deathLocations[this.lastDeath].y + i.mapOffset) * n);
                        var f = Math.max(defaultSettings.miniMapMyCellSize - 2, 4);
                        this.miniMapCtx.lineWidth = 1;
                        this.miniMapCtx.strokeStyle = this.deathLocations.length - 1 == this.lastDeath ? defaultSettings.miniMapDeathLocationColor : "#FFFFFF";
                        this.miniMapCtx.beginPath();
                        this.miniMapCtx.moveTo(u - f, d);
                        this.miniMapCtx.lineTo(u + f, d);
                        this.miniMapCtx.moveTo(u, d - f);
                        this.miniMapCtx.lineTo(u, d + f);
                        this.miniMapCtx.stroke();
                    }
                    this.miniMapCtx.restore();
                }
            },
            'drawMiniMapSectors': function(t, e, s, o, a) {
                this.miniMapSectors = document.getElementById('minimap-sectors');
                var n = this.miniMapSectors.getContext('2d');
                n.ogarioCtx = true;
                this.miniMapSectors.width = s;
                this.miniMapSectors.height = o;
                n.fillStyle = '#FFFFFF';
                this.dTok(n, s - 1);
                ogarfooddrawer.drawSectors(n, i.mapOffsetFixed, t, e, 0.5, a, s - 0.5, o - 9.5, defaultSettings.miniMapSectorsColor, defaultSettings.miniMapSectorsColor, 1, false);
            },
            'resetMiniMapSectors': function() {
                this.miniMapSectors = null;
            },
