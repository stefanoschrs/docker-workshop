package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func setupRouter() *gin.Engine {
	r := gin.Default()

	r.Use(cors.Default())

	r.GET("/data", func(c *gin.Context) {
		data := os.Getenv("DATA")
		if data == "" {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "data not found",
			})
			return
		}

		c.JSON(http.StatusOK, gin.H{
			"data": fmt.Sprintf("%s - %d", data, time.Now().Unix()),
		})
	})

	return r
}

func main() {
	r := setupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	if err := r.Run(":" + port); err != nil {
		log.Fatal(err)
	}
}
